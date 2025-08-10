import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ForgetPasswordDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;
}
