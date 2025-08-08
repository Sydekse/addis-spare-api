import { Inject, Injectable } from '@nestjs/common';
import { Inventory } from 'src/modules/inventory/domain/entities/inventory.entity';
import {
  INVENTORY_REPOSITORY,
  InventoryRepository,
} from 'src/modules/inventory/domain/repositories/inventory.repository';

@Injectable()
export class FindAllInventoriesUseCase {
  constructor(
    @Inject(INVENTORY_REPOSITORY)
    private readonly inventoryRepository: InventoryRepository,
  ) {}

  async execute(): Promise<Inventory[]> {
    return this.inventoryRepository.findAll();
  }
}
