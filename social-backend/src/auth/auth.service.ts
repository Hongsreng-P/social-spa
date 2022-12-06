import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.enitity';
import { UsersService } from 'src/users/users.service';
import { jwtPayloadDto } from './dto/jwt-payload.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(username: string, password:string) {
        const targetUser: User = await this.userService.findByUserName(username);
        
        if (targetUser && targetUser.password === password) {
            const {password, ...result} = targetUser;
            return result;
        }
        return null;
    }

    async generateJwt(user: User) {
        const targetUser: User = await this.userService.findByUserName(user.username);
        const {password, ...nonSensitiveUserInfo} = targetUser;

        const payload: jwtPayloadDto = {
            username: user.username,
            id: user.id,
            role: user.role,
        };
        return {
            access_token: this.jwtService.sign(payload),
            user: nonSensitiveUserInfo,
        };
    }
}
