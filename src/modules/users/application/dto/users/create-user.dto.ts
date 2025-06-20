import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength, Matches, ValidateNested, IsEnum } from 'class-validator';
import { ContactDto } from './user-contact.dto';
import { UserRole } from 'src/modules/users/domain/entity/user-data-types';
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

    @MinLength(8, {
        message: 'Password must be at least 8 characters long',
    })
    @MaxLength(100, {
        message: 'Password must not exceed 100 characters',
    })
    @IsNotEmpty()
    passwordHash: string;

    @IsNotEmpty()
    @IsEnum(UserRole, {
        message: 'Role must be a valid UserRole',
    })
    role: UserRole;

    @ValidateNested()
    @Type(() => ContactDto)
    contact: ContactDto;

}