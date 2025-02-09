import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateInvestmentDto } from 'src/modules/investments/dto/create-investment.dto';
import { UpdateInvestmentDto } from 'src/modules/investments/dto/update-investment.dto';
import { Company } from 'src/modules/investments/entities/company.entity';
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

  async findByUuid(userUuid: string, uuid: string): Promise<Investment | null> {
    return await this.prismaService.investment.findFirst({
      where: { uuid, wallet: { user: { uuid: userUuid } }, deletedAt: null },
      include: { wallet: true },
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

  async findCompanyByUuid(uuid: string): Promise<Company | null> {
    return await this.prismaService.company.findFirst({
      where: { uuid, deletedAt: null },
    });
  }

  async findAllCompanies(): Promise<Company[]> {
    return await this.prismaService.company.findMany({
      where: { deletedAt: null },
      orderBy: { name: 'asc' },
    });
  }

  async update(uuid: string, data: UpdateInvestmentDto): Promise<Investment> {
    const { walletUuid, companyUuid, ...fields } = data;

    return await this.prismaService.investment.update({
      where: {
        uuid,
        wallet: { uuid: walletUuid },
        company: { uuid: companyUuid },
        deletedAt: null,
      },
      data: { ...fields },
    });
  }

  async delete(userUuid: string, uuid: string): Promise<Investment> {
    return await this.prismaService.investment.update({
      where: { uuid, wallet: { user: { uuid: userUuid } }, deletedAt: null },
      data: { deletedAt: new Date() },
    });
  }
}
