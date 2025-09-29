import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Order } from 'src/modules/order/domain/entities/order.entity';
import {
  ORDER_REPOSITORY,
  OrderRepository,
} from 'src/modules/order/domain/repositories/order.repository';
import { OrderStatus } from '../../dto/create-order.dto';
import { DataSource } from 'typeorm';
import { UpdateOrderStatusDto } from '../../dto/update-order.dto';

@Injectable()
export class UpdateOrderStatusUseCase {
  constructor(
    @Inject(DataSource)
    private readonly dataSource: DataSource,
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: OrderRepository,
  ) {}

  async execute(id: string, dto: UpdateOrderStatusDto): Promise<Order> {
    return this.dataSource.transaction(async (manager): Promise<Order> => {
      const order = await this.orderRepository.findById(id);
      if (!order) {
        throw new NotFoundException('order is not found');
      }

      if (order.getStatus() === OrderStatus.CANCELLED) {
        throw new BadRequestException(
          "once an order is cancelled it's status cannot be changed",
        );
      }

      order.changeStatus(dto.status);

      await this.orderRepository.save(order, manager);
      return order;
    });
  }
}
