import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryController } from './interfaces/http/controllers/inventory.controller';
import { InventoryTypeOrmEntity } from './infrastructure/persistence/typeorm/inventory-typeorm.entity';
import { InventoryTypeOrmRepository } from './infrastructure/persistence/repositories/inventory-typeorm.repository';
import { INVENTORY_REPOSITORY } from './domain/repositories/inventory.repository';
import { CreateInventoryUseCase } from './application/use-cases/create/create-inventory.use-case';
import { UpdateInventoryUseCase } from './application/use-cases/update/update-inventory.use-case';
import { DeleteInventoryUseCase } from './application/use-cases/delete/delete-inventory.use-case';
import { FindInventoryByIdUseCase } from './application/use-cases/find/find-inventory.use-case';
import { FindAllInventoriesUseCase } from './application/use-cases/find/all-inventorys.use-case';
import { ProductModule } from '../product/product.module';
import { LowStockEvent } from './domain/events/low-stock.event';
import { LowStockHandler } from './domain/events/handler/low-stock-event.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { FindInventoryByProductIdUseCase } from './application/use-cases/find/find-inventories-by-product.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([InventoryTypeOrmEntity]),
    ProductModule,
    CqrsModule,
  ],
  controllers: [InventoryController],
  providers: [
    CreateInventoryUseCase,
    UpdateInventoryUseCase,
    DeleteInventoryUseCase,
    FindInventoryByIdUseCase,
    FindAllInventoriesUseCase,
    LowStockEvent,
    LowStockHandler,
    FindInventoryByProductIdUseCase,
    {
      provide: INVENTORY_REPOSITORY,
      useClass: InventoryTypeOrmRepository,
    },
  ],
  exports: [INVENTORY_REPOSITORY],
})
export class InventoryModule {}
