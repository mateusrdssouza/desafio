import { Expose } from 'class-transformer';

export class FindWalletDto {
  @Expose()
  uuid: string;

  @Expose()
  name: string;

  @Expose()
  balance: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
