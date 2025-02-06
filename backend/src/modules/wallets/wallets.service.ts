import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { WalletsRepository } from 'src/repositories/wallets-repository';
import { User } from '../users/entities/user.entity';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
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

  async findAll(user: User): Promise<Wallet[]> {
    try {
      return await this.walletsRepository.findAll(user.uuid);
    } catch (error) {
      throw error;
    }
  }

  async findOne(user: User, uuid: string): Promise<Wallet> {
    try {
      const wallet = await this.walletsRepository.findByUuid(user.uuid, uuid);

      if (!wallet) {
        throw new NotFoundException('Carteira não encontrada');
      }

      return wallet;
    } catch (error) {
      throw error;
    }
  }

  async update(
    user: User,
    uuid: string,
    data: UpdateWalletDto,
  ): Promise<Wallet> {
    try {
      const wallet = await this.walletsRepository.findByUuid(user.uuid, uuid);

      if (!wallet) {
        throw new NotFoundException('Carteira não encontrada');
      }

      const walletByName = await this.walletsRepository.findByName(
        user.uuid,
        data.name,
      );

      if (walletByName && walletByName.uuid !== uuid) {
        throw new ConflictException('O nome da carteira já está em uso');
      }

      return await this.walletsRepository.update(user.uuid, uuid, data);
    } catch (error) {
      throw error;
    }
  }
}
