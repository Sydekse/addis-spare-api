import { Order } from "../entities/order.entity";

export const ORDER_REPOSITORY = Symbol.for('OrderRepository');
export interface OrderRepository {
  findById(id: string): Promise<Order | null>;
  findAll(): Promise<Order[]>;
  save(order: Order): Promise<void>;
  update(order: Order): Promise<void>;
  delete(id: string): Promise<void>;
}
