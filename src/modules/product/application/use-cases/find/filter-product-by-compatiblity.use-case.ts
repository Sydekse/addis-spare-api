import { Inject, Injectable } from '@nestjs/common';
import { Product } from '../../../domain/entities/product.entity';
import {
  PRODUCT_REPOSITORY,
  ProductRepository,
} from '../../../domain/repositories/product.repository';

@Injectable()
export class FilterCompatibleProductsUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(query: {
    make?: string;
    model?: string;
    year?: number;
    useOr?: boolean;
  }): Promise<Product[]> {
    const qry = {
      make: query.make || '',
      model: query.model || '',
      year: query.year || -1,
      useOr: query.useOr || false,
    };
    return await this.productRepository.findCompatibleProducts(qry);
  }
}
