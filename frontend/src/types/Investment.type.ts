export interface CreateInvestmentType {
  walletUuid: string;
  companyUuid: string;
  shares: number;
  amount: number;
}

export interface CompanyType {
  uuid: string;
  name: string;
  description: string;
  sector: string;
  ticker: string;
  stockExchange: string;
  stockPrice: number;
  marketCapitalization: string;
  marketRiskLevel: MarketRiskLevel;
  logoUrl: string;
}

export interface InvestmentType {
  uuid: string;
  shares: number;
  amount: number;
}

export enum MarketRiskLevel {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}
