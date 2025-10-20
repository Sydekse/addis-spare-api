import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  INVENTORY_REPOSITORY,
  InventoryRepository,
} from 'src/modules/inventory/domain/repositories/inventory.repository';
import { Inventory } from 'src/modules/inventory/domain/entities/inventory.entity';

@Injectable()
export class FindInventoryByIdUseCase {
  constructor(
    @Inject(INVENTORY_REPOSITORY)
    private readonly inventoryRepository: InventoryRepository,
  ) {}

  async execute(id: string): Promise<Inventory | null> {
    const inventory = await this.inventoryRepository.findById(id);

    if (!inventory) {
      throw new NotFoundException('inventory not found');
    }

    return inventory;
  }
}
