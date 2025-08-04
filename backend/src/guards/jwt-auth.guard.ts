import { JwtService } from '@nestjs/jwt';
import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { UNAUTHORIZED } from 'src/utils/response';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>  {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    if (!authHeader)
      throw UNAUTHORIZED(undefined, 'Authorization header missing');

    const token: any = authHeader.split(' ')[1];
    if (!token) {
      throw UNAUTHORIZED(null, 'Token is missing');
    }
    try {
      const decodedToken = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      console.log(decodedToken)
      const user = await this.userService.findUser({ id: decodedToken.id})
      if (!user) throw UNAUTHORIZED([], "Invalid Token")
      request.user = user
      return true
    } catch (error) {
      console.log(error.message)
      throw UNAUTHORIZED(null, 'Invalid token');
    }
  }
}

