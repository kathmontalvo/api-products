import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express"
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private JwtService: JwtService
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Unauthorized access')
    }

    try {
      const payload = await this.JwtService.verifyAsync(
        token,
        { secret: 'secret_key_@123456789' }
      );

      request['user'] = payload;

    } catch {
      throw new UnauthorizedException('The token is invalid or has expired.')
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {

    const headersAuth = request.headers.authorization;
    if (!headersAuth) return;

    const [type, token] = headersAuth.split(' ');

    return type === 'Bearer' ? token : undefined;

  }

}
