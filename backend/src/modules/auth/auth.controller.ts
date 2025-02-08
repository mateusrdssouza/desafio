import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthRequest } from 'src/common/interfaces/auth-request.interface';
import { Public } from 'src/utils/constants';
import { transformToDto } from 'src/utils/transform';
import { FindUserDto } from '../users/dto/find-user.dto';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Public()
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Get('profile')
  async profile(@Request() req: AuthRequest) {
    try {
      if (!req.user) {
        throw new UnauthorizedException('Acesso não autorizado');
      }

      const user = await this.usersService.findOne(req.user.uuid);

      return transformToDto(FindUserDto, user);
    } catch (error) {
      throw new BadRequestException(
        error?.message || 'Erro ao buscar o perfil',
      );
    }
  }
}
