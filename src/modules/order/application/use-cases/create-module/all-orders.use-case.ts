import { Inject, Injectable } from '@nestjs/common';
import { Order } from 'src/modules/order/domain/entities/order.entity';
import { ORDER_REPOSITORY, OrderRepository } from 'src/modules/order/domain/repositories/order.repository';

@Injectable()
export class FindAllOrdersUseCase {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: OrderRepository,
  ) {}

  async execute(): Promise<Order[]> {
    return this.orderRepository.findAll();
  }
}
