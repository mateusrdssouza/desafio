import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateInvestmentDto } from 'src/modules/investments/dto/create-investment.dto';
import { Investment } from 'src/modules/investments/entities/investment.entity';
import { InvestmentsRepository } from '../investments-repository';

@Injectable()
export class PrismaInvestmentsRepository implements InvestmentsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateInvestmentDto): Promise<Investment> {
    const { walletUuid, companyUuid, ...fields } = data;

    return await this.prismaService.investment.create({
      data: {
        ...fields,
        wallet: { connect: { uuid: walletUuid } },
        company: { connect: { uuid: companyUuid } },
      },
    });
  }

  async findByWallet(
    walletUuid: string,
    companyUuid: string,
  ): Promise<Investment | null> {
    return await this.prismaService.investment.findFirst({
      where: {
        wallet: { uuid: walletUuid },
        company: { uuid: companyUuid },
        deletedAt: null,
      },
    });
  }
}
