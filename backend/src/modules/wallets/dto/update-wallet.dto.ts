import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class UpdateWalletDto {
  @IsNotEmpty({ message: 'Digite um nome' })
  @IsString({ message: 'Digite um nome válido' })
  name: string;

  @IsOptional()
  @IsInt({ message: 'Informe um valor' })
  @IsPositive({ message: 'Informe um valor válido' })
  balance?: number;
}
