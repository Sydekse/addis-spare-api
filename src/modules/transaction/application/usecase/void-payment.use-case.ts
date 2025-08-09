import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { TransactionRepository } from 'src/modules/transaction//domain/repository/transaction.repository';
import { PaymentGatewayService } from 'src/modules/transaction//infrastructure/services/payment-gateway.service';
import {
  TransactionStatus,
  TransactionType,
} from 'src/modules/transaction/domain/entity/enums';
import { Transaction } from 'src/modules/transaction//domain/entity/transaction.entity';
import { VoidPaymentDto } from '../dto/void-payment.dto';

@Injectable()
export class VoidPaymentUseCase {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly paymentGateway: PaymentGatewayService,
  ) {}

  async execute(payment: VoidPaymentDto): Promise<Transaction> {
    const originalTransaction = await this.transactionRepository.findById(
      payment.originalTransactionId,
    );
    if (!originalTransaction) {
      throw new Error('Original transaction not found');
    }
    if (!originalTransaction.canVoid()) {
      throw new Error('Transaction cannot be voided');
    }

    const voidTransaction = new Transaction(
      uuidv4(),
      originalTransaction.getOrderId(),
      originalTransaction.getAmount(),
      originalTransaction.getCurrency(),
      TransactionType.VOID,
      TransactionStatus.PENDING,
      '',
      new Date(),
      new Date(),
    );

    const gatewayResponse =
      await this.paymentGateway.voidPayment(voidTransaction);
    if (gatewayResponse.success) {
      voidTransaction.complete();
    } else {
      voidTransaction.fail(gatewayResponse.message);
    }

    await this.transactionRepository.save(voidTransaction);
    return voidTransaction;
  }
}
