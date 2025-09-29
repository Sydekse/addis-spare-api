import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './interfaces/http/controllers/product.controller';
import { CreateProductUseCase } from './application/use-cases/create/create-product.use-case';
import { ProductTypeOrmEntity } from './infrastructure/persistence/typeorm/product-typeorm.entity';
import { ProductTypeOrmRepository } from './infrastructure/persistence/repositories/product-typeorm.repository';
import { PRODUCT_REPOSITORY } from './domain/repositories/product.repository';
import { FilterProductsUseCase } from './application/use-cases/find/find-products.use-case';
import { UpdateProductUseCase } from './application/use-cases/update/update-product.use-case';
import { FilterCompatibleProductsUseCase } from './application/use-cases/find/filter-product-by-compatiblity.use-case';
import { DeleteProductUseCase } from './application/use-cases/delete/delete-product.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([ProductTypeOrmEntity])],
  controllers: [ProductController],
  providers: [
    CreateProductUseCase,
    FilterProductsUseCase,
    UpdateProductUseCase,
    DeleteProductUseCase,
    FilterCompatibleProductsUseCase,
    {
      provide: PRODUCT_REPOSITORY,
      useClass: ProductTypeOrmRepository,
    },
  ],
  exports: [PRODUCT_REPOSITORY],
})
export class ProductModule {}
