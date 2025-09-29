import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  INVENTORY_REPOSITORY,
  InventoryRepository,
} from 'src/modules/inventory/domain/repositories/inventory.repository';
import { UpdateInventoryDto } from '../../dto/update-inventory.dto';
import { Inventory } from 'src/modules/inventory/domain/entities/inventory.entity';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class UpdateInventoryUseCase {
  constructor(
    @Inject(INVENTORY_REPOSITORY)
    private readonly inventoryRepository: InventoryRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(id: string, dto: UpdateInventoryDto): Promise<Inventory> {
    const inventory = await this.inventoryRepository.findById(id);

    if (!inventory) {
      throw new NotFoundException('inventory not found');
    }

    const newInventory = this.eventPublisher.mergeObjectContext(
      inventory.update(
        dto.productId,
        dto.location,
        dto.quantity,
        dto.reorderThreshold,
        dto.supplierId,
      ),
    );
    newInventory.commit();
    await this.inventoryRepository.update(inventory);
    return inventory;
  }
}
