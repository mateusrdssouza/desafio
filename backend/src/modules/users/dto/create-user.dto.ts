import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Digite um nome' })
  @IsString({ message: 'Digite um nome válido' })
  name: string;

  @IsNotEmpty({ message: 'Digite um e-mail' })
  @IsEmail({}, { message: 'Digite um e-mail válido' })
  email: string;

  @IsOptional()
  @IsInt({ message: 'Informe um valor' })
  @IsPositive({ message: 'Informe um valor válido' })
  balance?: bigint;

  @IsNotEmpty({ message: 'Digite uma senha' })
  @IsString({ message: 'Digite uma senha válida' })
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
  password: string;
}
