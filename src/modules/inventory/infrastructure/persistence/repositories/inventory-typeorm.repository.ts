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
import { ProductTypeOrmEntity } from 'src/modules/product/infrastructure/persistence/typeorm/product-typeorm.entity';
import { Product } from 'src/modules/product/domain/entities/product.entity';

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

  newProduct = (entity: ProductTypeOrmEntity): Product => {
    return new Product(
      entity.id,
      entity.name,
      entity.description,
      entity.sku,
      entity.brand,
      entity.category,
      entity.price,
      entity.images,
      entity.attributes,
      entity.tags,
      entity.stockControlled,
      entity.compatibility,
    );
  };

  async filterInventory(filters: Filter[]): Promise<Inventory[]> {
    const schema = {
      productId: 'string',
      location: 'string',
      quantity: 'number',
      reorderThreshold: 'number',
      supplierId: 'string',
      lastUpdated: 'Date',
    };
    const alias = 'inventory';
    const qb = this.repository
      .createQueryBuilder(alias)
      .leftJoinAndSelect(`${alias}.product`, 'product'); // include product

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
          this.newProduct(entity.product), // optional: include product
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
        relations: ['product'], // include product if needed
      });
      if (!inventory) {
        throw new NotFoundException(
          `Inventory with id=${orderInventory.id} not found`,
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
      relations: ['product'], // include product
      order: { quantity: 'DESC' },
    });

    const orderInventories: OrderInventory[] = [];
    let remaining = requiredQuantity;

    for (const inventory of inventories) {
      if (remaining <= 0) break;

      const deduct = Math.min(remaining, inventory.quantity);
      inventory.quantity -= deduct;
      remaining -= deduct;

      if (deduct !== 0) {
        orderInventories.push(new OrderInventory(inventory.id, deduct));
      }

      await manager.save(InventoryTypeOrmEntity, inventory);
    }

    if (remaining > 0) {
      throw new BadRequestException(
        `Not enough inventory for product with id=${productId}`,
      );
    }

    return orderInventories;
  }

  async findInventoriesByProductId(id: string): Promise<Inventory[]> {
    const inventories = await this.repository.find({
      where: { productId: id },
      relations: ['product'], // include product
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
          this.newProduct(entity.product),
        ),
    );
  }

  async findById(id: string): Promise<Inventory | null> {
    const entity = await this.repository.findOne({
      where: { id },
      relations: ['product'], // include product
    });

    if (!entity) return null;

    return new Inventory(
      entity.id,
      entity.productId,
      entity.location,
      entity.quantity,
      entity.reorderThreshold,
      entity.supplierId,
      this.newProduct(entity.product),
    );
  }

  async findAll(): Promise<Inventory[]> {
    const entities = await this.repository.find({
      relations: ['product'], // include product
    });

    return entities.map(
      (entity) =>
        new Inventory(
          entity.id,
          entity.productId,
          entity.location,
          entity.quantity,
          entity.reorderThreshold,
          entity.supplierId,
          this.newProduct(entity.product),
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
      relations: ['product'], // include product if needed
    });
    if (!entity) throw new NotFoundException('Inventory not found');

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
