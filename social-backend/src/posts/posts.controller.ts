import { jwtPayloadDto } from './../auth/dto/jwt-payload.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, SetMetadata } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post as PostEntity } from './entities/post.entity';
import { Public } from 'src/util/public.decorator';
import { Roles } from 'src/util/role.decorator';
import { ReqUser } from 'src/util/user.decorator';
import { User } from 'src/users/entities/user.enitity';
import { OwnerGuard } from 'src/owner.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Roles('admin', 'user')
  @Post()
  create(@Body() createPostDto: CreatePostDto, @ReqUser() user: jwtPayloadDto): Promise<PostEntity[]> {
    const authorName = user.username;
    return this.postsService.create(createPostDto, authorName);
  }

  @Public()
  @Get()
  findAll(): Promise<PostEntity[]> {
    return this.postsService.findAll();
  }

  @Get('myposts')
  async findMyPosts(@ReqUser() user): Promise<PostEntity[]> {
    const authorName = user.username;
    return await this.postsService.findMyPost(authorName);
  }

  @Public() 
  @Get(':id')
  findOne(@Param('id') id: string): Promise<PostEntity> {
    return this.postsService.findOne(+id);
  }

  @Roles('admin', 'user')
  @Patch(':id')
  update(@Param('id') postId: string, @Body() updatePostDto: UpdatePostDto, @ReqUser() user: jwtPayloadDto): Promise<PostEntity[]> {
    const author:string = user.username;
    return this.postsService.update(+postId, updatePostDto, author);
  }

  @Roles('admin', 'user')
  @Delete(':id')
  async remove(@Param('id') postId: string, @ReqUser() user: User): Promise<any> {
    const result: PostEntity[] = await this.postsService.remove(+postId, user.username);
    return {
      user: user,
      result: result
    }
  }
}
