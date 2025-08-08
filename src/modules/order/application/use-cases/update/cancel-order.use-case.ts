import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  INVENTORY_REPOSITORY,
  InventoryRepository,
} from 'src/modules/inventory/domain/repositories/inventory.repository';
import { Order } from 'src/modules/order/domain/entities/order.entity';
import {
  ORDER_REPOSITORY,
  OrderRepository,
} from 'src/modules/order/domain/repositories/order.repository';
import { OrderStatus } from '../../dto/create-order.dto';
import { DataSource } from 'typeorm';

@Injectable()
export class CancelOrderUseCase {
  constructor(
    @Inject(DataSource)
    private readonly dataSource: DataSource,
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: OrderRepository,
    @Inject(INVENTORY_REPOSITORY)
    private readonly inventoryRepository: InventoryRepository,
  ) {}

  async execute(id: string): Promise<Order> {
    return this.dataSource.transaction(async (manager): Promise<Order> => {
      const order = await this.orderRepository.findById(id);
      if (!order) {
        throw new NotFoundException('order is not found');
      }

      if (order.getStatus() !== OrderStatus.PENDING) {
        throw new BadRequestException('only pending orders can be cancelled');
      }

      order.changeStatus(OrderStatus.CANCELLED);

      for (const item of order.getItems()) {
        await this.inventoryRepository.restoreDeductedInventories(
          item.inventories,
          manager,
        );
      }

      await this.orderRepository.save(order, manager);
      return order;
    });
  }
}
