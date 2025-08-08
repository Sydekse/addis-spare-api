import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class CartItemDto {
    @IsNotEmpty()
    userID: string;
    @IsString()
    @MaxLength(50)
    productId: string;
    @IsNotEmpty()
    @IsNumber()
    quantity: number;
    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsString()
    @MaxLength(255)
    compatibilityNote: string;

    @IsNotEmpty()
    @IsString()
    addedAt: Date;
}