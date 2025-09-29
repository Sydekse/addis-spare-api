import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Product } from '../../../domain/entities/product.entity';
import {
  PRODUCT_REPOSITORY,
  ProductRepository,
} from '../../../domain/repositories/product.repository';
import { CreateProductDto } from '../../dto/create-product.dto';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(dto: CreateProductDto): Promise<Product> {
    const product = Product.create(
      uuidv4(),
      dto.name,
      dto.description,
      dto.sku,
      dto.brand,
      dto.category,
      dto.price,
      dto.images,
      dto.attributes,
      dto.tags,
      dto.stockControlled,
      dto.compatibility,
    );
    await this.productRepository.save(product);
    return product;
  }
}
