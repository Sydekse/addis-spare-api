import { Inventory } from '../entities/inventory.entity';

export const INVENTORY_REPOSITORY = Symbol.for('InventoryRepository');

export interface InventoryRepository {
  findById(id: string): Promise<Inventory | null>;
  findAll(): Promise<Inventory[]>;
  save(inventory: Inventory): Promise<void>;
  update(inventory: Inventory): Promise<void>;
  delete(id: string): Promise<void>;
}
