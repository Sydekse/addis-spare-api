import { Inject, Injectable } from '@nestjs/common';
import {
  PRODUCT_REPOSITORY,
  ProductRepository,
} from 'src/modules/product/domain/repositories/product.repository';

@Injectable()
export class VAlidateSkuUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository,
  ) {}
  async execute(sku: string): Promise<boolean> {
    const product = await this.productRepository.findBySKU(sku);
    return !!product;
  }
}
