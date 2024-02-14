import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response';
import { LoginUserInput } from './dto/login-user.input';
import { LocalAuthGuard } from './guards/local.guard';

@Controller('auth')
@UseGuards(LocalAuthGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginUserInput: LoginUserInput): Promise<LoginResponse> {
    return this.authService.login(loginUserInput);
  }
}
