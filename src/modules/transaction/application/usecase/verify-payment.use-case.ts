import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import {
  TRANSACTION_REPOSITORY,
  TransactionRepository,
} from 'src/modules/transaction/domain/repository/transaction.repository';
import { PaymentGatewayService } from 'src/modules/transaction/infrastructure/services/payment-gateway.service';
import { Transaction } from 'src/modules/transaction/domain/entity/transaction.entity';
import {
  TransactionStatus,
  TransactionType,
} from 'src/modules/transaction/domain/entity/enums';
import { chapaWebhookResponseDto } from '../dto/chapa-webhook-response.dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class verifyPaymentUseCase {
  constructor(
    @Inject(TRANSACTION_REPOSITORY)
    private readonly transactionRepository: TransactionRepository,
    private readonly paymentGateway: PaymentGatewayService,
  ) {}

  async execute(dto: chapaWebhookResponseDto): Promise<void> {
    const payment = await this.transactionRepository.findByGatewayMessage(
      dto.trx_ref,
    );
    if (!payment) {
      throw new NotFoundException('payment is not found');
    }

    try {
      await this.paymentGateway.verifyPayment(payment, dto.ref_id, dto.trx_ref);
      payment.complete();
    } catch (err: any) {
      throw new BadRequestException(err.message || 'unkown error occured');
    }
  }
}
