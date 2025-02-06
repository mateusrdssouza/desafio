import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { PrismaUsersRepository } from 'src/repositories/prisma/prisma-users-repository';
import { UsersRepository } from 'src/repositories/users-repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
    PrismaService,
    UsersService,
    { provide: UsersRepository, useClass: PrismaUsersRepository },
  ],
  exports: [UsersService],
})
export class UsersModule {}
