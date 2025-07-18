import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';
import { SimulatedPaymentGatewayService } from '../../infrastructure/payment-gateway/simulated-payment-gateway.service';
import { Transaction, TransactionType, TransactionStatus } from '../../domain/entities/transaction.entity';
import { PaymentRefundedEvent } from '../../domain/events/payment-refunded.event';
import { OrderService } from '../../infrastructure/services/order.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RefundPaymentUseCase {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly paymentGateway: SimulatedPaymentGatewayService,
    private readonly orderService: OrderService,
  ) {}

  async execute(originalTransactionId: string): Promise<Transaction> {
    const originalTransaction = await this.transactionRepository.findById(originalTransactionId);
    if (!originalTransaction) {
      throw new Error('Original transaction not found');
    }
    if (!originalTransaction.canRefund()) {
      throw new Error('Transaction cannot be refunded');
    }

    const order = await this.orderService.getOrder(originalTransaction.getOrderId());
    if (!order) {
      throw new Error('Order not found');
    }
    if (order.status === 'shipped') {
      throw new Error('Cannot refund shipped order');
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

    const gatewayResponse = await this.paymentGateway.refundPayment(refundTransaction);
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