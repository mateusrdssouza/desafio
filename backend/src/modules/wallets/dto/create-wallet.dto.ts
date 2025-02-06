import { IsNotEmpty, IsString } from 'class-validator';

export class CreateWalletDto {
  @IsNotEmpty({ message: 'Digite um nome' })
  @IsString({ message: 'Digite um nome válido' })
  name: string;
}
