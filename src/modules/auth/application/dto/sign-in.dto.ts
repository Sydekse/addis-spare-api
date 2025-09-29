import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class SignInDto {
  @IsEmail(
    {},
    {
      message: 'Email must be a valid email address',
    },
  )
  email: string;

  @MinLength(8, {
    message: 'Password must be at least 8 characters long',
  })
  @MaxLength(100, {
    message: 'Password must not exceed 100 characters',
  })
  @IsNotEmpty()
  password: string;
}
