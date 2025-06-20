import {  IsString, MaxLength, Matches } from 'class-validator';

export class ContactDto {
    @Matches(/^\+?[1-9]\d{1,14}$/, {
        message: 'Phone number must be a valid international format',
    })
    @MaxLength(15, {
        message: 'Phone number must not exceed 15 characters',
    })
    phone: string;

    @IsString()
    @MaxLength(255, {
        message: 'Address must not exceed 255 characters',
    })
    address: string;

    @IsString()
    @MaxLength(100, {
        message: 'Country must not exceed 100 characters',
    })
    country: string;

    @IsString()
    @MaxLength(100, {
        message: 'City must not exceed 100 characters',
    })
    city: string;
}
