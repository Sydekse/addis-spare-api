import { IsEnum, IsString, IsNotEmpty } from 'class-validator';
import { TransactionType } from 'src/modules/transaction/domain/entity/enums';

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @IsEnum(TransactionType)
  type: TransactionType;
}
