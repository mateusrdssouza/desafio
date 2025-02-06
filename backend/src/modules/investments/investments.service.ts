import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InvestmentsRepository } from 'src/repositories/investments-repository';
import { WalletsRepository } from 'src/repositories/wallets-repository';
import { User } from '../users/entities/user.entity';
import { CreateInvestmentDto } from './dto/create-investment.dto';

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

      const investmentByWallet = await this.investmentsRepository.findByWallet(
        data.walletUuid,
        data.companyUuid,
      );

      if (investmentByWallet) {
        throw new ConflictException(
          'Já foi feito um investimento nessa empresa',
        );
      }

      await this.investmentsRepository.create(data);

      return {
        message: 'Investimento realizado com sucesso',
      };
    } catch (error) {
      throw error;
    }
  }
}
