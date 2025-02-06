import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { Public } from 'src/utils/constants';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ message: string }> {
    try {
      await this.usersService.create(createUserDto);

      return {
        message: 'Usuário cadastrado com sucesso',
      };
    } catch (error) {
      throw new BadRequestException(
        error?.message || 'Erro ao criar o usuário',
      );
    }
  }
}
