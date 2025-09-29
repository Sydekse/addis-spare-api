import { Inventory } from '../entities/inventory.entity';

export class InventoryCreatedEvent {
  constructor(public readonly inventory: Inventory) {}
}
