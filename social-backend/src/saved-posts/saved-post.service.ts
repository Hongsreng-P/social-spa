import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.enitity";
import { Repository } from "typeorm";
import { InternalServerErrorException } from '@nestjs/common';
import { Post } from "src/posts/entities/post.entity";
import { SavedPostContainer } from "./entities/saved-post.entity";
import { UsersService } from "src/users/users.service";


@Injectable()
export class SavedPostContainerService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Post)
        private postRepository: Repository<Post>,
        @InjectRepository(SavedPostContainer)
        private savedPostRepository: Repository<SavedPostContainer>,
        private readonly usersService: UsersService
    ) {}

    async addToPostToSavedPosts(username: string, postId: number) {
        const user = await this.userRepository.findOneBy({username:username});

        let container = await user.savedPostContainer;

        if (!container) {
            container = this.savedPostRepository.create();
        }

        const newPost = await this.postRepository.findOneBy({id: postId});
        const previousPost = await container.posts;
        container.posts = Promise.resolve([...previousPost, newPost]);

        user.savedPostContainer = Promise.resolve(container);
        await this.userRepository.save(user);

        return await (await user.savedPostContainer).posts;
    }

    async getSavedPosts(username: string) {
        const user = await this.usersService.findByUserName(username);

        if (!user) {
            throw new InternalServerErrorException();
        }

        const savedPostContainer = await user.savedPostContainer;
        const savedPosts = await savedPostContainer.posts;
        return savedPosts;
    }
}
