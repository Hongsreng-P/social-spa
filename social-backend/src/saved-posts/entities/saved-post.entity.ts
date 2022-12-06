import { User } from "src/users/entities/user.enitity";
import { Column, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { Post } from "../../posts/entities/post.entity";

@Entity()
export class SavedPostContainer {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => User, user => user.savedPostContainer)
    @JoinColumn()
    user: Relation<User>;

    @ManyToMany(type => Post, post => post.savedPostContainers, {
        cascade: true,
    })
    posts: Promise<Post[]>
}