import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { Post as PostEntity } from "src/posts/entities/post.entity";
import { User } from "src/users/entities/user.enitity";
import { ReqUser } from "src/util/user.decorator";
import { SavedPostContainerService } from "./saved-post.service";


@Controller('savedposts')
export class SavedPostContainerController {
    constructor(
        private readonly savedPostContainerService: SavedPostContainerService
    ) {}

    @Post()
    addToSavedPosts(@ReqUser() user: User, @Body() body) {
        const postId: number = parseInt(body.postId);
        const username = user.username;
        return this.savedPostContainerService.addToPostToSavedPosts(username, postId);
    }

    @Get()
    getSavedPosts(@ReqUser() user: User): Promise<PostEntity[]> {
        return this.savedPostContainerService.getSavedPosts(user.username);
    }
}
