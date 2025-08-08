import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { OrderRepository } from 'src/modules/order/domain/repositories/order.repository';
import { Order } from 'src/modules/order/domain/entities/order.entity';
import { OrderTypeOrmEntity } from '../typeorm/order-typeorm.entity';

@Injectable()
export class OrderTypeOrmRepository implements OrderRepository {
  constructor(
    @InjectRepository(OrderTypeOrmEntity)
    private readonly repository: Repository<OrderTypeOrmEntity>,
  ) {}
  async findByUserId(id: string): Promise<Order[]> {
    const orders = await this.repository.find({ where: { userId: id } });
    return orders.map(
      (entity) =>
        new Order(
          entity.id,
          entity.userId,
          entity.items,
          entity.subtotal,
          entity.tax,
          entity.shippingFee,
          entity.total,
          entity.status,
          entity.discounts,
        ),
    );
  }

  async findById(id: string): Promise<Order | null> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) return null;

    return new Order(
      entity.id,
      entity.userId,
      entity.items,
      entity.subtotal,
      entity.tax,
      entity.shippingFee,
      entity.total,
      entity.status,
      entity.discounts,
    );
  }

  async findAll(): Promise<Order[]> {
    const entities = await this.repository.find();
    return entities.map(
      (entity) =>
        new Order(
          entity.id,
          entity.userId,
          entity.items,
          entity.subtotal,
          entity.tax,
          entity.shippingFee,
          entity.total,
          entity.status,
          entity.discounts,
        ),
    );
  }

  async save(order: Order, manager: EntityManager): Promise<void> {
    const entity = new OrderTypeOrmEntity();
    entity.id = order.getId();
    entity.userId = order.getUserId();
    entity.items = order.getItems();
    entity.discounts = order.getDiscounts();
    entity.subtotal = order.getSubtotal();
    entity.tax = order.getTax();
    entity.shippingFee = order.getShippingFee();
    entity.total = order.getTotal();
    entity.status = order.getStatus();

    await manager.save(entity);
    // await this.repository.save(entity);
  }

  async update(order: Order): Promise<void> {
    const entity = await this.repository.findOne({
      where: { id: order.getId() },
    });
    if (!entity) throw new Error('Order not found');

    entity.id = order.getId();
    entity.userId = order.getUserId();
    entity.items = order.getItems();
    entity.discounts = order.getDiscounts();
    entity.subtotal = order.getSubtotal();
    entity.tax = order.getTax();
    entity.shippingFee = order.getShippingFee();
    entity.total = order.getTotal();
    entity.status = order.getStatus();

    await this.repository.save(entity);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
