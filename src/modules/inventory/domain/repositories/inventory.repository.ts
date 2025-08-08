import { EntityManager } from 'typeorm';
import { Inventory } from '../entities/inventory.entity';
import { OrderInventory } from 'src/modules/order/infrastructure/persistence/typeorm/order-typeorm.entity';
import { Filter } from 'src/modules/report/application/dto/create-report.dto';

export const INVENTORY_REPOSITORY = Symbol.for('InventoryRepository');

export interface InventoryRepository {
  findById(id: string): Promise<Inventory | null>;
  findAll(): Promise<Inventory[]>;
  save(inventory: Inventory): Promise<void>;
  findInventoriesByProductId(id: string): Promise<Inventory[]>;
  update(inventory: Inventory): Promise<void>;
  deductQuantityForProduct(
    productId: string,
    requiredQuantity: number,
    manager: EntityManager,
  ): Promise<OrderInventory[]>;
  delete(id: string): Promise<void>;
  restoreDeductedInventories(
    orderInventories: OrderInventory[],
    manager: EntityManager,
  ): Promise<void>;
  filterInventory(filters: Filter[]): Promise<Inventory[]>;
}
