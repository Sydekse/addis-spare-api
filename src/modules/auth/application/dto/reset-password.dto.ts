import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class ResetPasswordDto {
  tokenId: string = '';
  token: string = '';

  @IsString()
  @MaxLength(15, {
    message: 'Phone number must not exceed 15 characters',
  })
  @MinLength(8, {
    message: 'Password must be at least 8 characters long',
  })
  @MaxLength(100, {
    message: 'Password must not exceed 100 characters',
  })
  @IsNotEmpty()
  password: string;
}
