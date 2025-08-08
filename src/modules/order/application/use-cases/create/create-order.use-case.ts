import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateOrderDto } from '../../dto/create-order.dto';
import {
  Order,
  OrderItem,
} from 'src/modules/order/domain/entities/order.entity';
import {
  INVENTORY_REPOSITORY,
  InventoryRepository,
} from 'src/modules/inventory/domain/repositories/inventory.repository';
import {
  PRODUCT_REPOSITORY,
  ProductRepository,
} from 'src/modules/product/domain/repositories/product.repository';
import {
  ORDER_REPOSITORY,
  OrderRepository,
} from 'src/modules/order/domain/repositories/order.repository';
import { v4 as uuidv4 } from 'uuid';
import {
  USER_REPOSITORY,
  UserRepository,
} from 'src/modules/users/domain/repository/user.repository';
import { DataSource, LessThan } from 'typeorm';

@Injectable()
export class PlaceOrderUseCase {
  constructor(
    @Inject(DataSource)
    private readonly dataSource: DataSource,
    @Inject(INVENTORY_REPOSITORY)
    private readonly inventoryRepository: InventoryRepository,
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository,
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: OrderRepository,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(id: string, dto: CreateOrderDto): Promise<Order> {
    const TAX_RATE = 0.15;

    return this.dataSource.transaction(async (manager) => {
      const user = await this.userRepository.findById(id);
      if (!user) {
        throw new ForbiddenException('forbidden request');
      }

      let subtotal = 0;
      const orderItems: OrderItem[] = [];
      for (const item of dto.items) {
        const product = await this.productRepository.findById(item.productId);
        if (!product) {
          throw new BadRequestException(
            `product with id=${item.productId} not found`,
          );
        }

        const inventories =
          await this.inventoryRepository.findInventoriesByProductId(
            item.productId,
          );
        let total_quantity = 0;
        for (const inventory of inventories) {
          total_quantity += inventory.getQuantity();
        }
        if (total_quantity < item.quantity) {
          throw new BadRequestException(
            `not enough quantity for the product with id=${item.productId}`,
          );
        }

        const orderInventories =
          await this.inventoryRepository.deductQuantityForProduct(
            product.getId(),
            item.quantity,
            manager,
          );
        orderItems.push(
          new OrderItem(
            item.productId,
            item.sku,
            item.name,
            item.quantity,
            item.unitPrice,
            orderInventories,
          ),
        );
        subtotal += item.unitPrice * item.quantity;
      }

      const tax = TAX_RATE * subtotal;
      let discountPrice = 0;

      if (dto.discounts) {
        for (const discount of dto.discounts) {
          discountPrice += discount.amount;
        }
      }

      const total = subtotal + tax + dto.shippingFee - discountPrice;
      const order = Order.create(
        uuidv4(),
        user.getId(),
        orderItems,
        subtotal,
        tax,
        dto.shippingFee,
        total,
        dto.status,
        dto.discounts,
      );
      await this.orderRepository.save(order, manager);
      return order;
    });
  }
}
