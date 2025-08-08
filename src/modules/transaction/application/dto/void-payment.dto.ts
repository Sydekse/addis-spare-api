import { IsNotEmpty, IsString } from "class-validator";

export class VoidPaymentDto {
    @IsString()
    @IsNotEmpty()
    originalTransactionId: string;
    
}