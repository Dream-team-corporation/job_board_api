import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, IsEmail, IsInt, Min, Max} from 'class-validator'
import { User } from '../users/entity'


@Entity()
export class Job extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number;

    @IsString()
    @Column('text', { nullable: false })
    name: string;

    @IsEmail()
    @Column('text', { nullable: false })
    email: string;

    @IsString()
    @Column('text', { nullable: true })
    phoneNumber: string;

    @IsString()
    @Column('text', { nullable: false })
    city: string;

    @IsString()
    @Column('text', { nullable: false })
    address: string;

    @IsString()
    @Column('text', { nullable: false })
    zipcode: string;

    @IsString()
    @Column('text', { nullable: true })
    jobTitle: string;

    @IsInt()
    @Min(0)
    @Max(10)
    @Column('int', { nullable: true })
    preference: number;

    @IsString()
    @Column('text', { nullable: true })
    status: string;

    @ManyToOne(_ => User, user => user.jobs)
    user: User;

}