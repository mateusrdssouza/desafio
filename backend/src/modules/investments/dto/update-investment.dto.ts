import { IsInt, IsNotEmpty, IsPositive, IsUUID } from 'class-validator';

export class UpdateInvestmentDto {
  @IsNotEmpty({ message: 'Selecione uma carteira' })
  @IsUUID('all', { message: 'Selecione uma carteira válida' })
  walletUuid: string;

  @IsNotEmpty({ message: 'Selecione um empresa' })
  @IsUUID('all', { message: 'Selecione um empresa válida' })
  companyUuid: string;

  @IsNotEmpty({ message: 'Informe a quantidade de ações' })
  @IsInt({ message: 'Informe uma quantidade válida' })
  @IsPositive({ message: 'Informe uma quantidade válida' })
  shares: bigint;

  @IsNotEmpty({ message: 'Informe o valor das ações' })
  @IsInt({ message: 'Informe um valor válido' })
  @IsPositive({ message: 'Informe um valor válido' })
  amount: bigint;
}
