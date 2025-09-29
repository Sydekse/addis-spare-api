import {
  Controller,
  Post,
  Body,
  Param,
  HttpCode,
  UsePipes,
  ValidationPipe,
  Get,
} from '@nestjs/common';
import { CreateTransactionDto } from 'src/modules/transaction/application/dto/create-transaction.dto';
import { TransactionResponseDto } from 'src/modules/transaction/application/dto/transaction-responce.dto';
import { CapturePaymentUseCase } from 'src/modules/transaction/application/usecase/capture-payment.use-case';
import { RefundPaymentUseCase } from 'src/modules/transaction/application/usecase/refund-payment.use-case';
import { verifyPaymentUseCase } from 'src/modules/transaction/application/usecase/verify-payment.use-case';
import { VoidPaymentUseCase } from 'src/modules/transaction/application/usecase/void-payment.use-case';
import { Transaction } from 'src/modules/transaction/domain/entity/transaction.entity';

@Controller('payments')
@UsePipes(new ValidationPipe())
export class PaymentController {
  constructor(
    private readonly capturePaymentUseCase: CapturePaymentUseCase,
    private readonly refundPaymentUseCase: RefundPaymentUseCase,
    private readonly voidPaymentUseCase: VoidPaymentUseCase,
    private readonly verifyPaymentUseCase: verifyPaymentUseCase,
  ) {}

  @Post('capture')
  @HttpCode(201)
  async capture(
    @Body() dto: CreateTransactionDto,
  ): Promise<TransactionResponseDto> {
    const transaction = await this.capturePaymentUseCase.execute(dto);
    return this.mapToResponseDto(transaction);
  }

  @Post('refund/:transactionId')
  @HttpCode(201)
  async refund(
    @Param('transactionId') transactionId: string,
  ): Promise<TransactionResponseDto> {
    const transaction = await this.refundPaymentUseCase.execute(transactionId);
    return this.mapToResponseDto(transaction);
  }

  @Post('void/:transactionId')
  @HttpCode(201)
  async void(
    @Param('transactionId') transactionId: string,
  ): Promise<TransactionResponseDto> {
    const transaction = await this.voidPaymentUseCase.execute(transactionId);
    return this.mapToResponseDto(transaction);
  }

  @Get('payout/success')
  async chapaWebhookHandler(@Body() dto) {
    return this.verifyPaymentUseCase.execute(dto);
  }

  private mapToResponseDto(transaction: Transaction): TransactionResponseDto {
    return {
      id: transaction.getId(),
      orderId: transaction.getOrderId(),
      amount: transaction.getAmount(),
      currency: transaction.getCurrency(),
      type: transaction.getType(),
      status: transaction.getStatus(),
      gatewayResponse: transaction.getGatewayResponse(),
      createdAt: transaction.getCreatedAt(),
      updatedAt: transaction.getUpdatedAt(),
    };
  }
}
