import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Product } from '../../../domain/entities/product.entity';
import {
  PRODUCT_REPOSITORY,
  ProductRepository,
} from '../../../domain/repositories/product.repository';
import { UpdateProductDto } from '../../dto/update-product.dto';

@Injectable()
export class UpdateProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(id: string, dto: UpdateProductDto): Promise<Product> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFoundException('product not found');
    }

    const newProd = await this.productRepository.findBySKU(dto.sku);
    if (newProd && newProd.getId() !== product.getId()) {
      throw new BadRequestException('sku must be unique');
    }

    product.update(
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

    await this.productRepository.update(product);
    return product;
  }
}
