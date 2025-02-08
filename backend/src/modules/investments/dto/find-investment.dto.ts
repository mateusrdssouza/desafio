import { Expose, Type } from 'class-transformer';
import { FindCompanyDto } from './find-company.dto';

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

  @Expose()
  @Type(() => FindCompanyDto)
  company?: FindCompanyDto[];
}
