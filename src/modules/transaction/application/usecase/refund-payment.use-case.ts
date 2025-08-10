import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { TransactionRepository } from 'src/modules/transaction/domain/repository/transaction.repository';
import { PaymentGatewayService } from 'src/modules/transaction/infrastructure/services/payment-gateway.service';
import { Transaction } from 'src/modules/transaction/domain/entity/transaction.entity';
import {
  TransactionStatus,
  TransactionType,
} from 'src/modules/transaction/domain/entity/enums';

@Injectable()
export class RefundPaymentUseCase {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly paymentGateway: PaymentGatewayService,
  ) {}

  async execute(transactionID: string): Promise<Transaction> {
    const originalTransaction =
      await this.transactionRepository.findById(transactionID);
    if (!originalTransaction) {
      throw new Error('Original transaction not found');
    }
    if (!originalTransaction.canRefund()) {
      throw new Error('Transaction cannot be refunded');
    }

    const refundTransaction = new Transaction(
      uuidv4(),
      originalTransaction.getOrderId(),
      originalTransaction.getAmount(),
      originalTransaction.getCurrency(),
      TransactionType.REFUND,
      TransactionStatus.PENDING,
      '',
      new Date(),
      new Date(),
    );

    const gatewayResponse =
      await this.paymentGateway.refundPayment(refundTransaction);
    if (gatewayResponse.success) {
      refundTransaction.complete();
      // Emit PaymentRefundedEvent
    } else {
      refundTransaction.fail(gatewayResponse.message);
    }

    await this.transactionRepository.save(refundTransaction);
    return refundTransaction;
  }
}
