import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderService } from 'src/modules/transaction/infrastructure/services/order.service';
import { CapturePaymentUseCase } from 'src/modules/transaction/application/usecase/capture-payment.use-case';
import { PaymentController } from 'src/modules/transaction/interface/http/controllers/transaction.controller';
import { RefundPaymentUseCase } from 'src/modules/transaction/application/usecase/refund-payment.use-case';
import { VoidPaymentUseCase } from 'src/modules/transaction/application/usecase/void-payment.use-case';
import { PaymentGatewayService } from 'src/modules/transaction/infrastructure/services/payment-gateway.service';
import { TransactionTypeOrmEntity } from 'src/modules/transaction/infrastructure/typeorm/transaction-typeorm.entity';
import { TransactionTypeOrmRepository } from './infrastructure/repositories/transaction-typeorm.repository';
import { TRANSACTION_REPOSITORY } from './domain/repository/transaction.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionTypeOrmEntity])],
  controllers: [PaymentController],
  providers: [
    CapturePaymentUseCase,
    RefundPaymentUseCase,
    VoidPaymentUseCase,
    PaymentGatewayService,
    OrderService,
    {
      provide: TRANSACTION_REPOSITORY,
      useClass: TransactionTypeOrmRepository,
    },
  ],
})
export class PaymentsModule {}
