import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { InventoryRepository } from '../../../domain/repositories/inventory.repository';
import { InventoryTypeOrmEntity } from '../typeorm/inventory-typeorm.entity';
import { Inventory } from 'src/modules/inventory/domain/entities/inventory.entity';
import { OrderInventory } from 'src/modules/order/infrastructure/persistence/typeorm/order-typeorm.entity';
import { Filter } from 'src/modules/report/application/dto/create-report.dto';
import { Filterable } from 'src/modules/report/infrastructure/persistence/repositories/filters-typeorm.repository';

@Injectable()
export class InventoryTypeOrmRepository
  extends Filterable
  implements InventoryRepository
{
  constructor(
    @InjectRepository(InventoryTypeOrmEntity)
    private readonly repository: Repository<InventoryTypeOrmEntity>,
  ) {
    super();
  }
  async filterInventory(filters: Filter[]): Promise<Inventory[]> {
    const schema = {
      productId: 'string',
      location: 'string',
      quantity: 'number',
      reorderTreshould: 'number',
      supplierId: 'string',
      lastUpdated: 'Date',
    };
    const alias = 'inventory';
    const qb = this.repository.createQueryBuilder(alias);
    this.applyFilters(qb, alias, filters, schema);
    const inventories = await qb.getMany();
    return inventories.map(
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
  async restoreDeductedInventories(
    orderInventories: OrderInventory[],
    manager: EntityManager,
  ): Promise<void> {
    for (const orderInventory of orderInventories) {
      const inventory = await this.repository.findOne({
        where: { id: orderInventory.id },
      });
      if (!inventory) {
        throw new NotFoundException(
          `inventory with id=${orderInventory.id} is not found`,
        );
      }

      inventory.quantity += orderInventory.quantity;
      await manager.save(inventory);
    }
  }

  async deductQuantityForProduct(
    productId: string,
    requiredQuantity: number,
    manager: EntityManager,
  ): Promise<OrderInventory[]> {
    const inventories = await this.repository.find({
      where: { productId },
      order: { quantity: 'DESC' },
    });
    const orderInventories: OrderInventory[] = [];

    let remaining = requiredQuantity;
    for (const inventory of inventories) {
      if (remaining <= 0) break;
      const deduct = Math.min(remaining, inventory.quantity);
      inventory.quantity -= deduct;
      remaining -= deduct;
      if (deduct != 0) {
        orderInventories.push(new OrderInventory(inventory.id, deduct));
      }
      await manager.save(InventoryTypeOrmEntity, inventory);
    }

    if (remaining > 0) {
      throw new BadRequestException(
        `not enough inventory for the product with id=${productId}`,
      );
    }

    return orderInventories;
  }

  async findInventoriesByProductId(id: string): Promise<Inventory[]> {
    const inventories = await this.repository.find({
      where: { productId: id },
      order: { quantity: 'DESC' },
    });
    return inventories.map(
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
