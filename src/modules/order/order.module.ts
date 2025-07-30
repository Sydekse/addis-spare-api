import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './domain/entities/order.entity';
import { ORDER_REPOSITORY } from './domain/repositories/order.repository';
import { OrderTypeOrmRepository } from './infrastructure/repository/order-typeorm.repository';
import { OrderTypeOrmEntity } from './infrastructure/typeorm/order-typeorm.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  providers: [
    {
      provide: 'ORDER_REPOSITORY',
      useClass: OrderTypeOrmRepository,
    },
  ],
  exports: [ORDER_REPOSITORY],
})
export class OrderModule {}
