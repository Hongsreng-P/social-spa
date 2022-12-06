import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from "src/posts/entities/post.entity";
import { User } from "src/users/entities/user.enitity";
import { UsersModule } from "src/users/users.module";
import { SavedPostContainer } from "./entities/saved-post.entity";
import { SavedPostContainerController } from "./saved-post.controller";
import { SavedPostContainerService } from "./saved-post.service";


@Module({
  imports: [TypeOrmModule.forFeature([SavedPostContainer, User, Post]), UsersModule],
  controllers: [SavedPostContainerController],
  providers: [SavedPostContainerService]
})
export class SavedPostContainerModule {}
