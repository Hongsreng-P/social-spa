import { Post } from "src/posts/entities/post.entity";
import { SavedPostContainer } from "src/saved-posts/entities/saved-post.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { UserInfo } from "./user-info.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    role: string;

    @OneToOne(type => UserInfo, info => info.user, {
        eager: true,
        cascade: true,
    })
    info: Relation<UserInfo>;

    @OneToMany(type => Post, post => post.user, {
        cascade: true,
    })
    posts: Promise<Post[]>;

    @OneToOne(type => SavedPostContainer, savedPostContainer => savedPostContainer.user, {
        cascade: true,
    })
    savedPostContainer: Promise<SavedPostContainer>;
}