import { Expose } from 'class-transformer';

export class FindInvestmentDto {
  @Expose()
  uuid: string;

  @Expose()
  shares: number;

  @Expose()
  amount: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
