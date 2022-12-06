import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.enitity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(User)
    private userRepository: Repository<User>, 
  ) {}

  async create(createPostDto: CreatePostDto, authorName: string): Promise<Post[]> {
    const author = await this.userRepository.findOneBy({
      username: authorName,
    });

    if (!author) {
      throw new InternalServerErrorException();
    }

    const newPost = await this.postRepository.create({
      author: author.username,
      title: createPostDto.title,
      description: createPostDto.description
    });

    const previousPosts = await author.posts;
    author.posts = Promise.resolve([...previousPosts, newPost]);

    await this.userRepository.save(author);

    return await author.posts;
  }

  async findAll(): Promise<Post[]> {
    return this.postRepository.find();
  }

  async findOne(id: number): Promise<Post> {
    return this.postRepository.findOneBy({id});
  }

  async findMyPost(authorName): Promise<Post[]> {
    const author = await this.userRepository.findOneBy({
      username: authorName,
    });
    return await author.posts;
  }

  async update(postId: number, updatePostDto: UpdatePostDto, author: string): Promise<Post[]> {
    const user = await this.usersService.findByUserName(author);

    const isPostOwner = (await this.isPostOwner(user, postId));
    if (!isPostOwner) {
      throw new BadRequestException;
    }

    let postToUpdate: Post = await this.postRepository.findOneBy({id:postId});
    if (!postToUpdate) {
      throw new BadRequestException;
    }
    postToUpdate.author = author;
    postToUpdate.title = updatePostDto.title;
    postToUpdate.description = updatePostDto.description;
    await this.postRepository.save(postToUpdate);
    return this.findAll();
  }

  async isPostOwner(user: User, id: number): Promise<boolean> {    
    const posts = await user.posts;
    console.log(posts);
    if (!(posts.find(post => post.id === id))) {
      return false;
    }
    return true;
  }

  async remove(postId: number, username: string): Promise<Post[]> {
    const user = await this.usersService.findByUserName(username);

    if (!user) {
      throw new InternalServerErrorException();
    }

    const isPostOwner = await this.isPostOwner(user, postId);
    if (!isPostOwner) {
      throw new BadRequestException();
    }    

    let postToRemove: Post = await this.postRepository.findOneBy({id:postId});
    if (!postToRemove) {
      throw new BadRequestException;
    } 
    await this.postRepository.remove(postToRemove);

    return this.findAll();
  }
}
