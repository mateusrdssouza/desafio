import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { comparePasswords } from 'src/utils/bcrypt';
import { UsersService } from '../users/users.service';
import { AccessTokenDto } from './dto/access-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, pass: string): Promise<AccessTokenDto> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const isValid = await comparePasswords(pass, user.password);

    if (!isValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = { uuid: user.uuid, name: user.name, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
