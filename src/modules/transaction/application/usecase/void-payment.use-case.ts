import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import {
  TRANSACTION_REPOSITORY,
  TransactionRepository,
} from 'src/modules/transaction//domain/repository/transaction.repository';
import { PaymentGatewayService } from 'src/modules/transaction//infrastructure/services/payment-gateway.service';
import {
  TransactionStatus,
  TransactionType,
} from 'src/modules/transaction/domain/entity/enums';
import { Transaction } from 'src/modules/transaction//domain/entity/transaction.entity';

@Injectable()
export class VoidPaymentUseCase {
  constructor(
    @Inject(TRANSACTION_REPOSITORY)
    private readonly transactionRepository: TransactionRepository,
    private readonly paymentGateway: PaymentGatewayService,
  ) {}

  async execute(transactionId: string): Promise<Transaction> {
    const originalTransaction =
      await this.transactionRepository.findById(transactionId);
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
      originalTransaction.getUserId(),
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
