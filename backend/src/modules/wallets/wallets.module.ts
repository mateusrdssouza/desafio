import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { PrismaWalletsRepository } from 'src/repositories/prisma/prisma-wallets-repository';
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
  ],
  exports: [WalletsService],
})
export class WalletsModule {}
