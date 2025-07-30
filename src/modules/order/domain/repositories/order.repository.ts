import { Order } from '../entities/order.entity';
export const ORDER_REPOSITORY = Symbol.for('OrderRepository');
export interface OrderRepository {
  save(order: Order): Promise<void>;
  findById(id: string): Promise<Order | null>;
}
