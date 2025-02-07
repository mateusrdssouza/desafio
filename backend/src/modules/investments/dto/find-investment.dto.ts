import { Expose } from 'class-transformer';

export class FindInvestmentDto {
  @Expose()
  uuid: string;

  @Expose()
  shares: bigint;

  @Expose()
  amount: bigint;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
