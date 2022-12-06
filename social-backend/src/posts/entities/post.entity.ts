import { User } from "src/users/entities/user.enitity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { SavedPostContainer } from "../../saved-posts/entities/saved-post.entity";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    author: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @ManyToOne(type => User, user => user.posts)
    @JoinColumn()
    user: Relation<User>

    @ManyToMany(type => SavedPostContainer, savedPostContainer => savedPostContainer.posts)
    @JoinTable()
    savedPostContainers: Promise<SavedPostContainer>
};