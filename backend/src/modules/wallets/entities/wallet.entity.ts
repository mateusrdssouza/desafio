import { Investment } from 'src/modules/investments/entities/investment.entity';

export class Wallet {
  id: bigint;
  uuid: string;
  name: string;
  balance: bigint;
  createdAt: Date;
  updatedAt: Date;
  investments?: Investment[];
}
