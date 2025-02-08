import { Wallet } from 'src/modules/wallets/entities/wallet.entity';
import { Company } from './company.entity';

export class Investment {
  id: number;
  uuid: string;
  shares: number;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
  wallet?: Wallet;
  company?: Company;
}
