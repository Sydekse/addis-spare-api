import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  ValidateNested,
  MinLength,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ContactDto } from './user-contact.dto';
import { UserRole } from 'src/modules/users/domain/entity/user-data-types';

export class UpdateUserDto {
  @IsNotEmpty()
  id: string;

  @IsEmail(
    {},
    {
      message: 'Email must be a valid email address',
    },
  )
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

  @IsNotEmpty()
  @IsEnum(UserRole, {
    message: 'Role must be a valid UserRole',
  })
  role: UserRole;

  @ValidateNested()
  @Type(() => ContactDto)
  contact: ContactDto;
}
