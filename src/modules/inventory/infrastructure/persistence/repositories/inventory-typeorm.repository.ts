import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryRepository } from '../../../domain/repositories/inventory.repository';
import { InventoryTypeOrmEntity } from '../typeorm/inventory-typeorm.entity';
import { Inventory } from 'src/modules/inventory/domain/entities/inventory.entity';

@Injectable()
export class InventoryTypeOrmRepository implements InventoryRepository {
  constructor(
    @InjectRepository(InventoryTypeOrmEntity)
    private readonly repository: Repository<InventoryTypeOrmEntity>,
  ) {}

  async findById(id: string): Promise<Inventory | null> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) return null;

    return new Inventory(
      entity.id,
      entity.productId,
      entity.location,
      entity.quantity,
      entity.reorderThreshold,
      entity.supplierId,
    );
  }

  async findAll(): Promise<Inventory[]> {
    const entities = await this.repository.find();
    return entities.map(
      (entity) =>
        new Inventory(
          entity.id,
          entity.productId,
          entity.location,
          entity.quantity,
          entity.reorderThreshold,
          entity.supplierId,
        ),
    );
  }

  async save(inventory: Inventory): Promise<void> {
    const entity = new InventoryTypeOrmEntity();
    entity.id = inventory.getId();
    entity.productId = inventory.getProductId();
    entity.supplierId = inventory.getSupplierId();
    entity.lastUpdated = inventory.getLastUpdated();
    entity.quantity = inventory.getQuantity();
    entity.reorderThreshold = inventory.getReorderTreshould();
    entity.location = inventory.getLocation();

    await this.repository.save(entity);
  }

  async update(inventory: Inventory): Promise<void> {
    const entity = await this.repository.findOne({
      where: { id: inventory.getId() },
    });
    if (!entity) throw new Error('Module not found');

    entity.productId = inventory.getProductId();
    entity.supplierId = inventory.getSupplierId();
    entity.lastUpdated = inventory.getLastUpdated();
    entity.quantity = inventory.getQuantity();
    entity.reorderThreshold = inventory.getReorderTreshould();
    entity.location = inventory.getLocation();

    await this.repository.save(entity);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
