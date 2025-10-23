import { AggregateRoot } from '@nestjs/cqrs';
import { InventoryUpdatedEvent } from '../events/inventory-updated.event';
import { InventoryCreatedEvent } from '../events/inventory-created.event';
import { LowStockEvent } from '../events/low-stock.event';
import { Product } from 'src/modules/product/domain/entities/product.entity';

export class Inventory extends AggregateRoot {
  private id: string;
  private productId: string;
  private location: string;
  private quantity: number;
  private reorderTreshould: number;
  private supplierId?: string;
  private lastUpdated: Date;
  private product?: Product;
  private reorderThreshold: number;

  constructor(
    id: string,
    productId: string,
    location: string,
    quantity: number,
    reorderTreshould: number,
    supplierId?: string,
    product?: Product,
  ) {
    super();
    this.id = id;
    this.productId = productId;
    this.location = location;
    this.quantity = quantity;
    this.reorderTreshould = reorderTreshould;
    this.reorderThreshold = this.reorderThreshold;
    this.supplierId = supplierId;
    this.product = product;
    this.lastUpdated = new Date();
  }

  public getId(): string {
    return this.id;
  }

  public getProductId(): string {
    return this.productId;
  }

  public getLocation(): string {
    return this.location;
  }

  public getQuantity(): number {
    return this.quantity;
  }

  public getReorderTreshould(): number {
    return this.reorderTreshould;
  }

  public getSupplierId(): string | undefined {
    return this.supplierId;
  }

  public getLastUpdated(): Date {
    return this.lastUpdated;
  }

  public update(
    productId: string,
    location: string,
    quantity: number,
    reorderTreshould: number,
    supplierId?: string,
  ): Inventory {
    this.productId = productId;
    this.location = location;
    this.quantity = quantity;
    this.reorderTreshould = reorderTreshould;
    this.supplierId = supplierId;
    this.lastUpdated = new Date();
    if (this.reorderTreshould >= this.quantity) {
      this.apply(new LowStockEvent(this));
    }
    this.apply(new InventoryUpdatedEvent(this));
    return this;
  }

  public static create(
    id: string,
    productId: string,
    location: string,
    quantity: number,
    reorderTreshould: number,
    supplierId?: string,
  ): Inventory {
    const inventory = new Inventory(
      id,
      productId,
      location,
      quantity,
      reorderTreshould,
      supplierId,
    );
    inventory.apply(new InventoryCreatedEvent(inventory));
    return inventory;
  }
}
