import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { PaymentGatewayService } from 'src/modules/transaction/infrastructure/services/payment-gateway.service';
import {
  TRANSACTION_REPOSITORY,
  TransactionRepository,
} from 'src/modules/transaction/domain/repository/transaction.repository';
import { Transaction } from 'src/modules/transaction/domain/entity/transaction.entity';
import {
  TransactionStatus,
  TransactionType,
} from 'src/modules/transaction/domain/entity/enums';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import {
  ORDER_REPOSITORY,
  OrderRepository,
} from 'src/modules/order/domain/repositories/order.repository';
import { OrderStatus } from 'src/modules/order/application/dto/create-order.dto';
import {
  USER_REPOSITORY,
  UserRepository,
} from 'src/modules/users/domain/repository/user.repository';

@Injectable()
export class CapturePaymentUseCase {
  constructor(
    @Inject(TRANSACTION_REPOSITORY)
    private readonly transactionRepository: TransactionRepository,
    private readonly paymentGateway: PaymentGatewayService,
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: OrderRepository,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(captureTrans: CreateTransactionDto): Promise<Transaction> {
    const order = await this.orderRepository.findById(captureTrans.orderId);
    if (!order) {
      throw new Error('Order not found');
    }

    if (order.status === OrderStatus.SHIPPED) {
      throw new Error('Cannot capture payment for shipped order');
    }

    const user = await this.userRepository.findById(order.getUserId());
    if (!user) {
      throw new NotFoundException('user is not found');
    }

    const transaction = new Transaction(
      uuidv4(),
      captureTrans.orderId,
      order.getTotal(),
      'ETB',
      captureTrans.type || TransactionType.CAPTURE,
      TransactionStatus.PENDING,
      order.userId,
      '',
      new Date(),
      new Date(),
    );

    // transaction.validateAgainstOrderTotal(order.total);
    // console.log('CapturePaymentUseCase called with:', captureTrans, transaction);
    const gatewayResponse = await this.paymentGateway.capturePayment(
      transaction,
      user,
    );
    if (gatewayResponse.success) {
      transaction.initiate(gatewayResponse.message);
      order.changeStatus(OrderStatus.PAID);
      await this.orderRepository.update(order);
      await this.transactionRepository.save(transaction);
    } else {
      transaction.fail(gatewayResponse.message);
      await this.transactionRepository.save(transaction);
      throw new BadRequestException(gatewayResponse.message);
    }

    return transaction;
  }
}
