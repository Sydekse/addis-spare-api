import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength, Matches } from 'class-validator';
export class CreateUserDto {

    @IsNotEmpty()
    id: string;

    @IsEmail({}, {
        message: 'Email must be a valid email address',
    })
    email: string;

    @IsString()
    @MaxLength(100, {
        message: 'Name must not exceed 100 characters',
    })
    name: string;

    @IsString()
    @MaxLength(15, {
        message: 'Phone number must not exceed 15 characters',
    })

    @Matches(/^\+?[1-9]\d{7,14}$/, {
        message: 'Phone number must be valid (e.g., +1234567890)',
    })
    phone: string;
}