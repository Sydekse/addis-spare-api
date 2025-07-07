import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from '../product/product.module';
import { OrderTypeOrmEntity } from './infrastructure/persistence/typeorm/order-typeorm.entity';
import { OrderController } from './interfaces/http/controllers/order.controller';
import { FindOrderByIdUseCase } from './application/use-cases/create-module/find-order.use-case';
import { FindAllOrdersUseCase } from './application/use-cases/create-module/all-orders.use-case';
import { DeleteOrderUseCase } from './application/use-cases/create-module/delete-order.use-case';
import { PlaceOrderUseCase } from './application/use-cases/create-module/create-order.use-case';
import { UpdateOrderUseCase } from './application/use-cases/create-module/update-order.use-case';
import { ORDER_REPOSITORY } from './domain/repositories/order.repository';
import { OrderTypeOrmRepository } from './infrastructure/persistence/repositories/order-typeorm.repository';

@Module({
  imports: [TypeOrmModule.forFeature([OrderTypeOrmEntity]), ProductModule],
  controllers: [OrderController],
  providers: [
    PlaceOrderUseCase,
    FindOrderByIdUseCase,
    FindAllOrdersUseCase,
    DeleteOrderUseCase,
    UpdateOrderUseCase,
    {
      provide: ORDER_REPOSITORY,
      useClass: OrderTypeOrmRepository,
    },
  ],
  exports: [ORDER_REPOSITORY],
})
export class OrderModule {}
