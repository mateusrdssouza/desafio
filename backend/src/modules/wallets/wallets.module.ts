import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { PrismaUsersRepository } from 'src/repositories/prisma/prisma-users-repository';
import { PrismaWalletsRepository } from 'src/repositories/prisma/prisma-wallets-repository';
import { UsersRepository } from 'src/repositories/users-repository';
import { WalletsRepository } from 'src/repositories/wallets-repository';
import { WalletsController } from './wallets.controller';
import { WalletsService } from './wallets.service';

@Module({
  imports: [],
  controllers: [WalletsController],
  providers: [
    PrismaService,
    WalletsService,
    { provide: WalletsRepository, useClass: PrismaWalletsRepository },
    { provide: UsersRepository, useClass: PrismaUsersRepository },
  ],
  exports: [WalletsService],
})
export class WalletsModule {}
