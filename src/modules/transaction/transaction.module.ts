import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CapturePaymentUseCase } from 'src/modules/transaction/application/usecase/capture-payment.use-case';
import { PaymentController } from 'src/modules/transaction/interface/http/controllers/transaction.controller';
import { RefundPaymentUseCase } from 'src/modules/transaction/application/usecase/refund-payment.use-case';
import { VoidPaymentUseCase } from 'src/modules/transaction/application/usecase/void-payment.use-case';
import { PaymentGatewayService } from 'src/modules/transaction/infrastructure/services/payment-gateway.service';
import { TransactionTypeOrmEntity } from 'src/modules/transaction/infrastructure/typeorm/transaction-typeorm.entity';
import { TransactionTypeOrmRepository } from './infrastructure/repositories/transaction-typeorm.repository';
import { TRANSACTION_REPOSITORY } from './domain/repository/transaction.repository';
import { OrderModule } from '../order/order.module';
import { ChapaModule } from 'chapa-nestjs';
import { UserModule } from '../users/user.module';
import { verifyPaymentUseCase } from './application/usecase/verify-payment.use-case';
import { StripeModule } from 'nestjs-stripe';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionTypeOrmEntity]),
    ChapaModule.register({
      secretKey: 'CHASECK_TEST-nlCF26UGAshYeA3jBqlk5nMMR0xcZI9C',
    }),
    StripeModule.forRoot({
      apiKey: process.env.STRIPE_KEY || '',
      apiVersion: '2020-08-27',
    }),
    OrderModule,
    UserModule,
  ],
  controllers: [PaymentController],
  providers: [
    verifyPaymentUseCase,
    CapturePaymentUseCase,
    RefundPaymentUseCase,
    VoidPaymentUseCase,
    PaymentGatewayService,
    {
      provide: TRANSACTION_REPOSITORY,
      useClass: TransactionTypeOrmRepository,
    },
  ],
})
export class PaymentsModule {}
