import { Reflector } from '@nestjs/core';
import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard extends AuthGuard('myJwtStrategy') {
    constructor(private reflector: Reflector) {
        super();
    }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const isPublic: boolean = this.reflector.getAllAndOverride<boolean>('public', [context.getHandler()]);

        if (isPublic) {
            return true;
        }

        return super.canActivate(context);
    }
}