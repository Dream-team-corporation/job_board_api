import {JsonController, Param, Get, HttpCode, Post, Body, CurrentUser, NotFoundError, Authorized, Patch, Delete} from "routing-controllers"
import { Job } from "./entity"
import { User } from "../users/entity"

@JsonController()
export default class UserController {

   @Authorized()
   @Get("/jobs/:id([0-9]+)")
   @HttpCode(200)
   async getJob(
       @Param('id') id: number
   ) {
       return Job.findOne(id)
   }

   @Authorized()
   @Get('/jobs')
   @HttpCode(200)
    async getAllJobs(
      @CurrentUser() currentUser: User
    ) {
        const jobs = await Job.find({
          where: {user_id:currentUser}
        })
        return jobs
    }

  //  @Authorized()
   @Post("/jobs")
   @HttpCode(201)
   async createJob(
     @Body() job: Partial <Job>,
     @CurrentUser() currentUser: User
   ) {
     const newJob = await Job.create({
        ...job,
        user:currentUser
     }).save()
     return newJob
   }

   @Authorized()
   @Patch("/jobs/:id([0-9]+)")
   @HttpCode(201)
   async updateJob(
      @Body() update: Partial <Job>,
      @Param("id") id: number
    ) {
      const job = await Job.findOne(id)
      if (!job) throw new NotFoundError(`Job with id ${id} does not exist!`)
      const updateJob = await Job.merge(job, update).save()

      return updateJob
    }

    @Authorized()
    @Delete("/jobs/:id([0-9]+)")
    @HttpCode(201)
    async deleteJob(
      @Param("id") id: number
    ) {
      const job = await Job.findOne(id)
      if (!job) throw new NotFoundError(`Job with id ${id} does not exist!`)

      await job.remove()
  
      return {
        message: `You succesfully deleted ${job.name}`
      }
    }
}