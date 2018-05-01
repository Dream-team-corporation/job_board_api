import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, IsEmail, MinLength } from 'class-validator'
import { Job } from '../jobs/entity'
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt'

@Entity()
export default class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsEmail()
  @Column('text')
  email: string

  @IsString()
  @MinLength(8)
  @Column('text')
  @Exclude({ toPlainOnly: true })
  password: string

  async setPassword(rawPassword: string) {
    const hash = await bcrypt.hash(rawPassword, 10)
    this.password = hash
  }

  checkPassword(rawPassword: string): Promise<boolean> {
    return bcrypt.compare(rawPassword, this.password)
  }

    @OneToMany(_ => Job, job => job.user, {eager:true}) 
    jobs: Job[]

    async setPassword(pass: string) {
        this.password = await bcrypt.hash(pass, 10)
      }
    
      checkPassword(pass: string): Promise<boolean> {
        return bcrypt.compare(pass, this.password)
      }
}
