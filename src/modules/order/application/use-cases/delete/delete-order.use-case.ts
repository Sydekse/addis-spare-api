import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  ORDER_REPOSITORY,
  OrderRepository,
} from 'src/modules/order/domain/repositories/order.repository';

@Injectable()
export class DeleteOrderUseCase {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: OrderRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const order = await this.orderRepository.findById(id);

    if (!order) {
      throw new NotFoundException('order not found');
    }

    this.orderRepository.delete(id);
  }
}
