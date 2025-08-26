import { IsEmail, IsEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsEmpty()
  password: string;
}
