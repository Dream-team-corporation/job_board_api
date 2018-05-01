import {JsonController, Param, Get, HttpCode, Post, Body } from "routing-controllers"
import { User } from "./entity"

@JsonController()
export default class UserController {

    @Get("/users/:id([0-9]+)")
    @HttpCode(200)
    async getStudents(
        @Param('id') id: number
    ) {
        return User.findOne(id)
    }

    @Post('/users')
    async signup(
      @Body() user: User
    ) {
      const {password, ...rest} = user
      const entity = User.create(rest)
      await entity.setPassword(password)
      return entity.save()
    }

}