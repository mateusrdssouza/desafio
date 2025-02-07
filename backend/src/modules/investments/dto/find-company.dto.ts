import { Expose } from 'class-transformer';

export class FindCompanyDto {
  @Expose()
  uuid: string;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  sector: string;

  @Expose()
  ticker: string;

  @Expose()
  stockExchange: string;

  @Expose()
  stockPrice: number;

  @Expose()
  marketCapitalization: string;

  @Expose()
  marketRiskLevel: string;

  @Expose()
  logoUrl: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
