import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductModule } from '../product/product.module';
import { OrderTypeOrmEntity } from './infrastructure/persistence/typeorm/order-typeorm.entity';
import { OrderController } from './interfaces/http/controllers/order.controller';
import { FindOrderByIdUseCase } from './application/use-cases/find/find-order.use-case';
import { FindAllOrdersUseCase } from './application/use-cases/find/all-orders.use-case';
import { DeleteOrderUseCase } from './application/use-cases/delete/delete-order.use-case';
import { PlaceOrderUseCase } from './application/use-cases/create/create-order.use-case';
import { ORDER_REPOSITORY } from './domain/repositories/order.repository';
import { OrderTypeOrmRepository } from './infrastructure/persistence/repositories/order-typeorm.repository';
import { UserModule } from '../users/user.module';
import { InventoryModule } from '../inventory/inventory.module';
import { FindOrderByUserIdUseCase } from './application/use-cases/find/find-order-by-user-id.use-case';
import { CancelOrderUseCase } from './application/use-cases/update/cancel-order.use-case';
import { UpdateOrderStatusUseCase } from './application/use-cases/update/update-order.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderTypeOrmEntity]),
    ProductModule,
    InventoryModule,
    UserModule,
  ],
  controllers: [OrderController],
  providers: [
    PlaceOrderUseCase,
    FindOrderByIdUseCase,
    FindAllOrdersUseCase,
    DeleteOrderUseCase,
    CancelOrderUseCase,
    FindOrderByUserIdUseCase,
    UpdateOrderStatusUseCase,
    {
      provide: ORDER_REPOSITORY,
      useClass: OrderTypeOrmRepository,
    },
  ],
  exports: [ORDER_REPOSITORY],
})
export class OrderModule {}
