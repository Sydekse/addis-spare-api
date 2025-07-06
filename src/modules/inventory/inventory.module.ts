import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryController } from './interfaces/http/controllers/inventory.controller';
import { InventoryTypeOrmEntity } from './infrastructure/persistence/typeorm/inventory-typeorm.entity';
import { InventoryTypeOrmRepository } from './infrastructure/persistence/repositories/inventory-typeorm.repository';
import { INVENTORY_REPOSITORY } from './domain/repositories/inventory.repository';
import { CreateInventoryUseCase } from './application/use-cases/create-module/create-inventory.use-case';
import { UpdateInventoryUseCase } from './application/use-cases/create-module/update-inventory.use-case';
import { DeleteInventoryUseCase } from './application/use-cases/create-module/delete-inventory.use-case';
import { FindInventoryByIdUseCase } from './application/use-cases/create-module/find-inventory.use-case';
import { FindAllInventoriesUseCase } from './application/use-cases/create-module/all-inventorys.use-case';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([InventoryTypeOrmEntity]), ProductModule],
  controllers: [InventoryController],
  providers: [
    CreateInventoryUseCase,
    UpdateInventoryUseCase,
    DeleteInventoryUseCase,
    FindInventoryByIdUseCase,
    FindAllInventoriesUseCase,
    {
      provide: INVENTORY_REPOSITORY,
      useClass: InventoryTypeOrmRepository,
    },
  ],
  exports: [INVENTORY_REPOSITORY],
})
export class InventoryModule {}
