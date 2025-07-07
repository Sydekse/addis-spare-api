import { Order } from "../entities/order.entity";

export class OrderUpdatedEvent {
  constructor(public readonly order: Order) {}
}
