import { AuthService } from './auth.service';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { User } from 'src/users/entities/user.enitity';
import { jwtPayloadDto } from './dto/jwt-payload.dto';

// Here, for every incoming request of the endpoint with this guard attached, it will look into the req body, 
// and extract the username and password and then invoke the validate callback logic with the credential as the args
// if the credential is correct, user object is returned, else the null or undefined is return
// and how do we get this strategy to be mounted on an endpoint? we can do it by using AuthGuard('myLocalStrategy)
// and the return will be the guard, and use it using UseGuards(AuthGuard('mylocalStrategy'))
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, "myLocalStrategy") {
    constructor(private authService: AuthService ) {
        super();
    }

    async validate(username: string, password: string): Promise<jwtPayloadDto | undefined> {
        const user: jwtPayloadDto = await this.authService.validateUser(username, password);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}