import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InvestmentsRepository } from 'src/repositories/investments-repository';
import { UsersRepository } from 'src/repositories/users-repository';
import { WalletsRepository } from 'src/repositories/wallets-repository';
import { User } from '../users/entities/user.entity';
import { UpdateWalletDto } from '../wallets/dto/update-wallet.dto';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { UpdateInvestmentDto } from './dto/update-investment.dto';
import { Company } from './entities/company.entity';
import { Investment } from './entities/investment.entity';

@Injectable()
export class InvestmentsService {
  constructor(
    private readonly investmentsRepository: InvestmentsRepository,
    private readonly walletsRepository: WalletsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async findAllCompanies(): Promise<Company[]> {
    try {
      return await this.investmentsRepository.findAllCompanies();
    } catch (error) {
      throw error;
    }
  }

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

      const search = await this.usersRepository.findByUuid(user.uuid);

      if (!search) {
        throw new NotFoundException('Usuário não encontrado');
      }

      if (data.amount > search.balance) {
        throw new ConflictException('Saldo insuficiente');
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

      const updatedWallet: UpdateWalletDto = {
        name: wallet.name,
        balance: wallet.balance + data.amount,
      };

      await this.walletsRepository.update(
        user.uuid,
        data.walletUuid,
        updatedWallet,
      );

      const balance = search.balance - data.amount;

      await this.usersRepository.update(user.uuid, { balance });

      return {
        message: 'Investimento realizado com sucesso',
      };
    } catch (error) {
      throw error;
    }
  }

  async delete(user: User, uuid: string): Promise<Investment> {
    try {
      const investment = await this.investmentsRepository.findByUuid(
        user.uuid,
        uuid,
      );

      if (!investment) {
        throw new NotFoundException('Investimento não encontrado');
      }

      if (!investment.wallet) {
        throw new NotFoundException('Carteira não encontrada');
      }

      const search = await this.usersRepository.findByUuid(user.uuid);

      if (!search) {
        throw new NotFoundException('Usuário não encontrado');
      }

      const updatedWallet: UpdateWalletDto = {
        name: investment.wallet.name,
        balance: investment.wallet.balance - investment.amount,
      };

      await this.walletsRepository.update(
        user.uuid,
        investment.wallet.uuid,
        updatedWallet,
      );

      const balance = search.balance + investment.amount;

      await this.usersRepository.update(user.uuid, { balance });

      return await this.investmentsRepository.delete(user.uuid, uuid);
    } catch (error) {
      throw error;
    }
  }
}
