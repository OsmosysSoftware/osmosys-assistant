import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const apiKey = this.configService.getOrThrow<string>('SERVER_API_KEY');
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers['authorization'];

    if (authHeader && authHeader === `Bearer ${apiKey}`) {
      return true;
    }

    throw new UnauthorizedException('Invalid API key');
  }
}
