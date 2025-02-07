import { Expose, Type } from 'class-transformer';
import { FindInvestmentDto } from 'src/modules/investments/dto/find-investment.dto';

export class FindWalletDto {
  @Expose()
  uuid: string;

  @Expose()
  name: string;

  @Expose()
  balance: bigint;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  @Type(() => FindInvestmentDto)
  investments?: FindInvestmentDto[];
}
