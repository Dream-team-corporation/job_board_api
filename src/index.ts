import 'reflect-metadata'
import { Action, BadRequestError, useKoaServer } from "routing-controllers"
import setupDb from './db'
import { verify } from './jwt'
import { secret } from './jwt'
import { User } from './users/entity'
import { Server } from 'http'
import UserController from './users/controller'
import LoginController from './logins/controller'
import * as Koa from 'koa'
import JobController from './jobs/controller'
const app = new Koa()
const server = new Server(app.callback())
const port = process.env.PORT || 4001

useKoaServer(app, {
  cors: true,
  controllers: [
    UserController,
    LoginController,
    JobController
  ],
  authorizationChecker: (action: Action) => {
   const header: string = action.request.headers.authorization
   if (header && header.startsWith('Bearer ')) {
     const [ , token ] = header.split(' ')

     try {
       return !!(token && verify(token))
     }
     catch (e) {
       throw new BadRequestError(e)
     }
   }

   return false
 },
 currentUserChecker: async (action: Action) => {
    const header: string = action.request.headers.authorization
    if (header && header.startsWith('Bearer ')) {
      const [ , token ] = header.split(' ')
      if (token) {
        const {id} = verify(token)
        return User.findOneById(id)
      }
    }
    return undefined
  }
})

setupDb()
  .then(_ => {
    server.listen(port)
    console.log(`Listening on port ${port}`)
  })
  .catch(err => console.error(err))
