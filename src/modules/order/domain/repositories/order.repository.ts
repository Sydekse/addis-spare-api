import { EntityManager } from 'typeorm';
import { Order } from '../entities/order.entity';

export const ORDER_REPOSITORY = Symbol.for('OrderRepository');
export interface OrderRepository {
  findById(id: string): Promise<Order | null>;
  findAll(): Promise<Order[]>;
  save(order: Order, manager: EntityManager): Promise<void>;
  findByUserId(id: string): Promise<Order[]>;
  update(order: Order): Promise<void>;
  delete(id: string): Promise<void>;
}
