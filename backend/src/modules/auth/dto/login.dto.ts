import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'Digite um e-mail' })
  @IsEmail({}, { message: 'Digite um e-mail válido' })
  email: string;

  @IsNotEmpty({ message: 'Digite uma senha' })
  @IsString({ message: 'Digite uma senha válida' })
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
  password: string;
}
