import { IsEmail, IsNotEmpty, IsString, MaxLength, Matches, ValidateNested, MinLength } from 'class-validator';
import { Type } from 'class-transformer';
import { ContactDto } from './user-contact.dto';
    
export class UpdateUserDto {
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
    @MinLength(8, {
        message: 'Password must be at least 8 characters long',
    })
    @MaxLength(255, {
        message: 'Password must not exceed 255 characters',
    })
    passwordHash: string;
        
    @ValidateNested()
    @Type(() => ContactDto)
    contact: ContactDto;
}