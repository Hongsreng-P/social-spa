import { AuthService } from './../auth/auth.service';
import { Body, Controller, forwardRef, Get, Inject, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { CreatePostDto } from 'src/posts/dto/create-post.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.enitity';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Public } from 'src/util/public.decorator';
import { Roles } from 'src/util/role.decorator';
import { ReqUser } from 'src/util/user.decorator';
import { jwtPayloadDto } from 'src/auth/dto/jwt-payload.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService,
        private authService: AuthService
    ) {}

    @Public()
    @UseGuards(AuthGuard('myLocalStrategy'))
    @Post('login')
    login(@ReqUser() user: User): any {
        return this.authService.generateJwt(user);
    }

    @Public()
    @Post('signup')
    signup(@Body() createUserDto: CreateUserDto): Promise<User[]> {
        return this.usersService.createUser(createUserDto);
    }

    @Roles('admin', 'user')
    @Get('profile')
    getProfile(@ReqUser() user: jwtPayloadDto): any {
        const username = user.username;
        return this.usersService.getUserInfo(username).catch(err => {
            throw new Error(err);
        });
    }

    @Public()
    @Get()
    async getAllUsers(): Promise<string[]> {
        return await this.usersService.findAllUsers();
    }
}
