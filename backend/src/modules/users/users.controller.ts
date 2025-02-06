import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { transformToDto } from 'src/utils/transform';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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

  @Get(':uuid')
  async find(@Param('uuid') uuid: string): Promise<FindUserDto> {
    try {
      const user = await this.usersService.find(uuid);
      return transformToDto(FindUserDto, user);
    } catch (error) {
      throw new BadRequestException(
        error?.message || 'Erro ao buscar o usuário',
      );
    }
  }
}
