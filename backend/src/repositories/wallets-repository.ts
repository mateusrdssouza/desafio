import { CreateWalletDto } from 'src/modules/wallets/dto/create-wallet.dto';
import { Wallet } from 'src/modules/wallets/entities/wallet.entity';

export abstract class WalletsRepository {
  abstract create(userUuid: string, data: CreateWalletDto): Promise<Wallet>;
  abstract findByName(userUuid: string, name: string): Promise<Wallet | null>;
  abstract findByUuid(userUuid: string, uuid: string): Promise<Wallet | null>;
}
