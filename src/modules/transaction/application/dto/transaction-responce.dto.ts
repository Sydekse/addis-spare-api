import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsString, Matches } from "class-validator";
import { TransactionStatus, TransactionType } from "../../domain/entity/enums";

export class TransactionResponseDto {
    id: string;
    orderId: string;
    amount: number;
    currency: string;
    type: TransactionType;
    status: TransactionStatus;
    gatewayResponse: string;
    createdAt: Date;
    updatedAt: Date;
}