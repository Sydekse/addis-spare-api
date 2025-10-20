import { Inject, Injectable } from '@nestjs/common';
import {
  INVENTORY_REPOSITORY,
  InventoryRepository,
} from 'src/modules/inventory/domain/repositories/inventory.repository';
import { Inventory } from 'src/modules/inventory/domain/entities/inventory.entity';

@Injectable()
export class FindInventoryByProductIdUseCase {
  constructor(
    @Inject(INVENTORY_REPOSITORY)
    private readonly inventoryRepository: InventoryRepository,
  ) {}

  async execute(id: string): Promise<Inventory[]> {
    const inventories =
      await this.inventoryRepository.findInventoriesByProductId(id);
    return inventories;
  }
}
