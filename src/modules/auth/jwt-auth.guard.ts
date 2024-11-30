import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JsonWebTokenError, TokenExpiredError } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from 'src/common/decorater/public.decorater';

@Injectable()
export class JwtAuthGuard extends AuthGuard('protect') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    console.log('activate');
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any): any {
    // You can throw an exception based on either "info" or "err" arguments
    console.log({ err, user, info });
    console.log('handleRequest');
    if (info instanceof TokenExpiredError) {
      throw new ForbiddenException();
    }
    if (info instanceof JsonWebTokenError) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
