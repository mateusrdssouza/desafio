import { Injectable, NotFoundException } from '@nestjs/common';
import { InvestmentsRepository } from 'src/repositories/investments-repository';
import { WalletsRepository } from 'src/repositories/wallets-repository';
import { User } from '../users/entities/user.entity';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { UpdateInvestmentDto } from './dto/update-investment.dto';

@Injectable()
export class InvestmentsService {
  constructor(
    private readonly investmentsRepository: InvestmentsRepository,
    private readonly walletsRepository: WalletsRepository,
  ) {}

  async create(
    user: User,
    data: CreateInvestmentDto,
  ): Promise<{ message: string }> {
    try {
      const wallet = await this.walletsRepository.findByUuid(
        user.uuid,
        data.walletUuid,
      );

      if (!wallet) {
        throw new NotFoundException('Carteira não encontrada');
      }

      const investment = await this.investmentsRepository.findByWallet(
        data.walletUuid,
        data.companyUuid,
      );

      if (investment) {
        const updatedData: UpdateInvestmentDto = {
          walletUuid: data.walletUuid,
          companyUuid: data.companyUuid,
          shares: investment.shares + data.shares,
          amount: investment.amount + data.amount,
        };

        await this.investmentsRepository.update(investment.uuid, updatedData);
      } else {
        await this.investmentsRepository.create(data);
      }

      return {
        message: 'Investimento realizado com sucesso',
      };
    } catch (error) {
      throw error;
    }
  }
}
