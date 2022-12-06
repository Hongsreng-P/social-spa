import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Post } from './entities/post.entity';
import { User } from 'src/users/entities/user.enitity';
import { SavedPostContainer } from '../saved-posts/entities/saved-post.entity';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User, SavedPostContainer]), UsersModule],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
