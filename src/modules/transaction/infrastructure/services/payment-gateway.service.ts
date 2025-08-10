import { Injectable } from '@nestjs/common';
import { Transaction } from 'src/modules/transaction/domain/entity/transaction.entity';

@Injectable()
export class PaymentGatewayService {
  capturePayment(
    transaction: Transaction,
  ): Promise<{ success: boolean; message: string }> {
    throw new Error('Method not implemented.');
  }

  refundPayment(
    transaction: Transaction,
  ): Promise<{ success: boolean; message: string }> {
    throw new Error('Method not implemented.');
  }

  voidPayment(
    transaction: Transaction,
  ): Promise<{ success: boolean; message: string }> {
    throw new Error('Method not implemented.');
  }
}
