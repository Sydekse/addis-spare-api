import { Inventory } from '../entities/inventory.entity';

export class LowStockEvent {
  constructor(public readonly inventory: Inventory) {}
}
