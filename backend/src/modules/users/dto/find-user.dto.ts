import { Expose } from 'class-transformer';

export class FindUserDto {
  @Expose()
  uuid: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  balance: bigint;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
