import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  TRANSACTION_REPOSITORY,
  TransactionRepository,
} from 'src/modules/transaction/domain/repository/transaction.repository';
import { PaymentGatewayService } from 'src/modules/transaction/infrastructure/services/payment-gateway.service';
import { chapaWebhookResponseDto } from '../dto/chapa-webhook-response.dto';

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
