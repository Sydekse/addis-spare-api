import {
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Product } from '../../../domain/entities/product.entity';
import {
  PRODUCT_REPOSITORY,
  ProductRepository,
} from '../../../domain/repositories/product.repository';
import { CreateProductDto } from '../../dto/create-product.dto';
import {
  USER_REPOSITORY,
  UserRepository,
} from 'src/modules/users/domain/repository/user.repository';
import { UserRole } from 'src/modules/users/domain/entity/user-data-types';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(userId: string, dto: CreateProductDto): Promise<Product> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (user.getRole() !== UserRole.SUPPLIER) {
      throw new ForbiddenException('Only suppliers can create products');
    }

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
      userId,
    );
    await this.productRepository.save(product);
    return product;
  }
}
