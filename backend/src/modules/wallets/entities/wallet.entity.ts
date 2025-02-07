import { Investment } from 'src/modules/investments/entities/investment.entity';

export class Wallet {
  id: number;
  uuid: string;
  name: string;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
  investments?: Investment[];
}
