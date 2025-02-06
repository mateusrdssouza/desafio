import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/modules/users/dto/update-user.dto';
import { User } from 'src/modules/users/entities/user.entity';
import { UsersRepository } from '../users-repository';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateUserDto): Promise<User> {
    return await this.prismaService.user.create({ data: { ...data } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.prismaService.user.findUnique({
      where: { email, deletedAt: null },
    });
  }

  async findByUuid(uuid: string): Promise<User | null> {
    return await this.prismaService.user.findUnique({
      where: { uuid, deletedAt: null },
    });
  }

  async update(uuid: string, data: UpdateUserDto): Promise<User> {
    return await this.prismaService.user.update({
      where: { uuid, deletedAt: null },
      data: { ...data },
    });
  }
}
