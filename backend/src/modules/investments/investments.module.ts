import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { InvestmentsRepository } from 'src/repositories/investments-repository';
import { PrismaInvestmentsRepository } from 'src/repositories/prisma/prisma-investments-repository';
import { PrismaWalletsRepository } from 'src/repositories/prisma/prisma-wallets-repository';
import { WalletsRepository } from 'src/repositories/wallets-repository';
import { InvestmentsController } from './investments.controller';
import { InvestmentsService } from './investments.service';

@Module({
  imports: [],
  controllers: [InvestmentsController],
  providers: [
    PrismaService,
    InvestmentsService,
    { provide: InvestmentsRepository, useClass: PrismaInvestmentsRepository },
    { provide: WalletsRepository, useClass: PrismaWalletsRepository },
  ],
  exports: [InvestmentsService],
})
export class InvestmentsModule {}
