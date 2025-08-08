import { Injectable } from '@nestjs/common';
import { OrderService } from 'src/modules/transaction/infrastructure/services/order.service';
import { v4 as uuidv4 } from 'uuid';
import { PaymentGatewayService } from 'src/modules/transaction/infrastructure/services/payment-gateway.service';
import { TransactionRepository } from 'src/modules/transaction/domain/repository/transaction.repository';
import { Transaction } from 'src/modules/transaction/domain/entity/transaction.entity';
import { TransactionStatus, TransactionType } from 'src/modules/transaction/domain/entity/enums';
import { CreateTransactionDto } from '../dto/create-transaction.dto';

@Injectable()
export class CapturePaymentUseCase {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly paymentGateway: PaymentGatewayService,
    private readonly orderService: OrderService,
  ) {}

  async execute(captureTrans : CreateTransactionDto): Promise<Transaction> {
    const order = await this.orderService.getOrder(captureTrans.orderId);
    if (!order) {
      throw new Error('Order not found');
    }
    if (order.status === 'shipped') {
      throw new Error('Cannot capture payment for shipped order');
    }

    const transaction = new Transaction(
      uuidv4(),
      captureTrans.orderId,
      captureTrans.amount,
      captureTrans.currency,
      captureTrans.type || TransactionType.CAPTURE,
      TransactionStatus.PENDING,
      '',
      new Date(),
      new Date(),
    );

    transaction.validateAgainstOrderTotal(order.total);

    const gatewayResponse = await this.paymentGateway.capturePayment(transaction);
    if (gatewayResponse.success) {
      transaction.complete();
    } else {
      transaction.fail(gatewayResponse.message);
    }

    await this.transactionRepository.save(transaction);
    return transaction;
  }
}