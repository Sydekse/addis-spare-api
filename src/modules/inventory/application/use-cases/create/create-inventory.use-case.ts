import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import {
  INVENTORY_REPOSITORY,
  InventoryRepository,
} from '../../../domain/repositories/inventory.repository';
import { Inventory } from 'src/modules/inventory/domain/entities/inventory.entity';
import { CreateInventoryDto } from '../../dto/create-inventory.dto';
import {
  PRODUCT_REPOSITORY,
  ProductRepository,
} from 'src/modules/product/domain/repositories/product.repository';

@Injectable()
export class CreateInventoryUseCase {
  constructor(
    @Inject(INVENTORY_REPOSITORY)
    private readonly inventoryRepository: InventoryRepository,
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(dto: CreateInventoryDto): Promise<Inventory> {
    const product = await this.productRepository.findById(dto.productId);
    if (!product) {
      throw new BadRequestException('product not found');
    }

    const inventory = Inventory.create(
      uuidv4(),
      dto.productId,
      dto.location,
      dto.quantity,
      dto.reorderThreshold,
      dto.supplierId,
    );

    await this.inventoryRepository.save(inventory);

    return inventory;
  }
}
