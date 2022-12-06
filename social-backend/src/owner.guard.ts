import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UsersService } from './users/users.service';

@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly userService: UsersService,
) {}

    // works here, just need to make the canActiviate to be async
  canActivate (
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const req = context.switchToHttp().getRequest();

    this.userService.findByUserName(req.user.username).then(user => {
        user.posts.then(posts => {
            console.log(posts);
            if (!(posts.find(post => post.id === req.params.id))) {
                console.log("unauthorized");
                return false;
            }
        })
    })
    console.log("authorized as the owner");
    return true;
  }
}