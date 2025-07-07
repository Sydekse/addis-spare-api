import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from '../../dto/create-order.dto';
import { Order } from 'src/modules/order/domain/entities/order.entity';

@Injectable()
export class PlaceOrderUseCase {
  constructor(
  ) {}

  async execute(dto: CreateOrderDto): Promise<Order> {
    throw new Error("not yet implemented");
  }
}
