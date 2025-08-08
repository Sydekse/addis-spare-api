import { Order } from '../entities/order.entity';

export class OrderCreatedEvent {
  constructor(public readonly order: Order) {}
}
