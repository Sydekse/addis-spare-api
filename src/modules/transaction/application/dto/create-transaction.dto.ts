import {
  IsEnum,
  IsNumber,
  IsString,
  IsNotEmpty,
  Matches,
} from 'class-validator';
import { TransactionType } from 'src/modules/transaction/domain/entity/enums';

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @IsNumber()
  amount: number;

  @IsString()
  @Matches(/^[A-Z]{3}$/)
  currency: string;

  @IsEnum(TransactionType)
  type: TransactionType;
}
