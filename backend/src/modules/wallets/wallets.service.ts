import { ConflictException, Injectable } from '@nestjs/common';
import { WalletsRepository } from 'src/repositories/wallets-repository';
import { User } from '../users/entities/user.entity';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { Wallet } from './entities/wallet.entity';

@Injectable()
export class WalletsService {
  constructor(private readonly walletsRepository: WalletsRepository) {}

  async create(user: User, data: CreateWalletDto): Promise<Wallet> {
    try {
      const walletByName = await this.walletsRepository.findByName(
        user.uuid,
        data.name,
      );

      if (walletByName) {
        throw new ConflictException('O nome da carteira já está em uso');
      }

      return await this.walletsRepository.create(user.uuid, data);
    } catch (error) {
      throw error;
    }
  }
}
