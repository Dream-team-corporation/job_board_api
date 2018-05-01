import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, IsEmail, MinLength } from 'class-validator'
import * as bcrypt from 'bcrypt'


@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number;

    @IsEmail()
    @Column('text', { nullable: false })
    email: string;
  
    @IsString()
    @MinLength(8)
    @Column('text', { nullable: false })
    password: string;

    async setPassword(pass: string) {
        this.password = await bcrypt.hash(pass, 10)
      }
    
      checkPassword(pass: string): Promise<boolean> {
        return bcrypt.compare(pass, this.password)
      }
    
}