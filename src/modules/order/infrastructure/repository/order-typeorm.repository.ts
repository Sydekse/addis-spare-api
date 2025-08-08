import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Order } from "../../domain/entities/order.entity";
import { OrderTypeOrmEntity } from "../typeorm/order-typeorm.entity";

@Injectable()
export class OrderTypeOrmRepository {
    constructor(
        @InjectRepository(OrderTypeOrmEntity)
        private readonly repository: Repository<OrderTypeOrmEntity>,
    ) {}

    async save(order: Order): Promise<void> {
        const orderEntity = new OrderTypeOrmEntity();
        orderEntity.id = order.getId();
        orderEntity.userId = order.getUserId();
        orderEntity.items = order.getItems();
        orderEntity.createdAt = order.getCreatedAt();

        await this.repository.save(orderEntity);
    }

    async findById(id: string): Promise<Order | null> {
        const orderEntity = await this.repository.findOne({ where: { id } });
        if (!orderEntity) return null;

        return new Order(
            orderEntity.id,
            orderEntity.userId,
            orderEntity.items ?? [],
            orderEntity.createdAt,
        );
    }
}