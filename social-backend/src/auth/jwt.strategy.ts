import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConfig } from "./jwt-config";
import { jwtPayloadDto } from "./dto/jwt-payload.dto";


// How does this works? first when this (@UseGuards(AuthGuards('myJwtStrategy))) is used as a decorator in an endpoint,
// it will check the req's header for authentication header (ExtractJwt.fromAuthHeaderAsBearerToken()) for every request to the endpoint
// and then it will decode the jwt, and then call the validate method, passing the decoded token (which is the payload data by here)
// you then, can decide what to do to the payload and return that object.
// that object will then be attached to the req.user
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "myJwtStrategy") {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConfig.secret,
        })
    } 

    async validate(payload: jwtPayloadDto): Promise<jwtPayloadDto> {
        return {
            username: payload.username,
            id: payload.id,
            role: payload.role,
        }
    }
}