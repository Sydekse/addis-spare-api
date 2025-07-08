import { Inject, Injectable } from '@nestjs/common';
import {
  ORDER_REPOSITORY,
  OrderRepository,
} from 'src/modules/order/domain/repositories/order.repository';
import { Order } from 'src/modules/order/domain/entities/order.entity';

@Injectable()
export class FindOrderByUserIdUseCase {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: OrderRepository,
  ) {}

  async execute(id: string): Promise<Order[]> {
    return this.orderRepository.findByUserId(id);
  }
}
