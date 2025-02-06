import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { AuthRequest } from 'src/common/interfaces/auth-request.interface';
import { Public } from 'src/utils/constants';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Get('profile')
  getProfile(@Request() req: AuthRequest) {
    return req.user;
  }
}
