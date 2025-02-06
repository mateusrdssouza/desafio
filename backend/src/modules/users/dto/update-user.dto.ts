import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty({ message: 'Informe o valor do saldo' })
  @IsInt({ message: 'Informe um valor válido' })
  balance: number;
}
