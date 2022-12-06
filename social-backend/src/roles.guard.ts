import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    console.log(roles);

    const req = context.switchToHttp().getRequest();

    console.log("user:", req.user);

    if (!roles) {
      return true;
    }

    for (const role of roles) {
      if (role === req.user.role) {
        return true;
      }
    }
    return false;
  }
}
