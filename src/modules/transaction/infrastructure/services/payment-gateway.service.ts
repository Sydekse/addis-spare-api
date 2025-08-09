import { Injectable } from '@nestjs/common';
import { Transaction } from 'src/modules/transaction/domain/entity/transaction.entity';

@Injectable()
export class PaymentGatewayService {
  async capturePayment(
    transaction: Transaction,
  ): Promise<{ success: boolean; message: string }> {
    throw new Error('Method not implemented.');
  }

  async refundPayment(
    transaction: Transaction,
  ): Promise<{ success: boolean; message: string }> {
    throw new Error('Method not implemented.');
  }

  async voidPayment(
    transaction: Transaction,
  ): Promise<{ success: boolean; message: string }> {
    throw new Error('Method not implemented.');
  }
}
