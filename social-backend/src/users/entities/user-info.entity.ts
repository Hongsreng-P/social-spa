import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { User } from "./user.enitity";

@Entity()
export class UserInfo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    address: string

    @Column()
    age: number

    @OneToOne(type => User, user => user.info)
    @JoinColumn()
    user: Relation<User>
}