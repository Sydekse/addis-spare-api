import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModuleController } from './interfaces/http/controllers/product.controller';
import { CreateProductUseCase } from './application/use-cases/create-module/create-product.use-case';
import { ProductTypeOrmEntity } from './infrastructure/persistence/typeorm/product-typeorm.entity';
import { ProductTypeOrmRepository } from './infrastructure/persistence/repositories/product-typeorm.repository';
import { PRODUCT_REPOSITORY } from './domain/repositories/product.repository';
import { FilterProductsUseCase } from './application/use-cases/create-module/find-products.use-case';
import { UpdateProductUseCase } from './application/use-cases/create-module/update-product.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([ProductTypeOrmEntity])],
  controllers: [ModuleController],
  providers: [
    CreateProductUseCase,
    FilterProductsUseCase,
    UpdateProductUseCase,
    {
      provide: PRODUCT_REPOSITORY,
      useClass: ProductTypeOrmRepository,
    },
  ],
  exports: [PRODUCT_REPOSITORY],
})
export class ProductModule {}
