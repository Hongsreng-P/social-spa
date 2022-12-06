import { BadGatewayException, BadRequestException, HttpException, HttpStatus, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserProfile } from './dto/user-profile.dto';
import { UserInfo } from './entities/user-info.entity';
import { User } from './entities/user.enitity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(UserInfo)
        private userInfoRepository: Repository<UserInfo>,
    ) {}

    async createUser(createUserDto: CreateUserDto): Promise<User[]> {
        const userNameExists = await this.findByUserName(createUserDto.username);
        if (userNameExists) {
            throw new BadGatewayException({
                statusCode: HttpStatus.FORBIDDEN,
                message: "User already exists"
            });
        }

        const newUser = await this.userRepository.create({
            username: createUserDto.username,
            password: createUserDto.password,
            role: createUserDto.role,
        });

        const newUserInfo = await this.userInfoRepository.create({
            age: createUserDto.age,
            address: createUserDto.address,
        });
    
        newUser.info = newUserInfo;
        await this.userRepository.save(newUser);

        return this.userRepository.find();
    };

    async findByUserName(username: string): Promise<User | null> {
        const targetUser = await this.userRepository.findOneBy({username});
        if (!targetUser) {
            return null;
        }
        return targetUser;
    };

    async getUserInfo(username: string): Promise<UserProfile> {
        const user = await this.findByUserName(username);

        if (!user) {
            throw new BadRequestException;
        }

        const { password, ...userProfile } = user;

        return userProfile;
    }

    async findAllUsers(): Promise<string[]> {
        const allUsers = await this.userRepository.find();
        return allUsers.map(user => user.username);
    }
}
