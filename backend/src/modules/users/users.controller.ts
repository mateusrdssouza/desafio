import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { Public } from 'src/utils/constants';
import { transformToDto } from 'src/utils/transform';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<FindUserDto> {
    try {
      const user = await this.usersService.create(createUserDto);
      return transformToDto(FindUserDto, user);
    } catch (error) {
      throw new BadRequestException(
        error?.message || 'Erro ao criar o usuário',
      );
    }
  }
}
