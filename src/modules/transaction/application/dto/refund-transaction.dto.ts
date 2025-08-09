import { IsNotEmpty, IsString } from 'class-validator';

export class RefundTransactionDto {
  @IsString()
  @IsNotEmpty()
  originalTransactionId: string;
}
