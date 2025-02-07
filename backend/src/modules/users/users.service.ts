import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from 'src/repositories/users-repository';
import { encryptPassword } from 'src/utils/bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(data: CreateUserDto): Promise<User> {
    try {
      const userByEmail = await this.usersRepository.findByEmail(data.email);

      if (userByEmail) {
        throw new ConflictException('O e-mail informado já está em uso');
      }

      const hashedPassword = await encryptPassword(data.password);

      return await this.usersRepository.create({
        ...data,
        password: hashedPassword,
        balance: parseInt(process.env.OPENING_BALANCE ?? '0'),
      });
    } catch (error) {
      throw error;
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      const user = await this.usersRepository.findByEmail(email);

      if (!user) {
        throw new NotFoundException('Usuário não encontrado');
      }

      return user;
    } catch (error) {
      throw error;
    }
  }
}
