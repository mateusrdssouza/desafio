import { InvestmentType } from "./Investment.types";

export interface CreateWalletType {
  name: string;
}

export interface UpdateWalletType {
  uuid: string;
  name: string;
}

export interface WalletType {
  uuid: string;
  name: string;
  balance: number;
  investments?: InvestmentType[];
}
