import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  ORDER_REPOSITORY,
  OrderRepository,
} from 'src/modules/order/domain/repositories/order.repository';
import { Order } from 'src/modules/order/domain/entities/order.entity';

@Injectable()
export class FindOrderByIdUseCase {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: OrderRepository,
  ) {}

  async execute(id: string): Promise<Order | null> {
    const order = await this.orderRepository.findById(id);

    if (!order) {
      throw new NotFoundException('order not found');
    }

    return order;
  }
}
