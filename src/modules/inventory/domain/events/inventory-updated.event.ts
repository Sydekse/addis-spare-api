import { Inventory } from '../entities/inventory.entity';

export class InventoryUpdatedEvent {
  constructor(public readonly inventory: Inventory) {}
}
