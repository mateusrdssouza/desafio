import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateWalletDto } from 'src/modules/wallets/dto/create-wallet.dto';
import { Wallet } from 'src/modules/wallets/entities/wallet.entity';
import { WalletsRepository } from '../wallets-repository';

@Injectable()
export class PrismaWalletsRepository implements WalletsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userUuid: string, data: CreateWalletDto): Promise<Wallet> {
    return await this.prismaService.wallet.create({
      data: { ...data, user: { connect: { uuid: userUuid } } },
    });
  }

  async findAll(userUuid: string): Promise<Wallet[]> {
    return await this.prismaService.wallet.findMany({
      where: { user: { uuid: userUuid }, deletedAt: null },
      include: { user: true },
    });
  }

  async findByName(userUuid: string, name: string): Promise<Wallet | null> {
    return await this.prismaService.wallet.findFirst({
      where: { name, user: { uuid: userUuid }, deletedAt: null },
      include: { user: true },
    });
  }

  async findByUuid(userUuid: string, uuid: string): Promise<Wallet | null> {
    return await this.prismaService.wallet.findFirst({
      where: { uuid, user: { uuid: userUuid }, deletedAt: null },
      include: { user: true },
    });
  }
}
