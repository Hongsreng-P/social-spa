import { IsNotEmpty, IsNumber } from "class-validator";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { UserInfo } from "../entities/user-info.entity";

export class UserProfile {
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    role: string;

    @IsNotEmpty()
    info: UserInfo;
}