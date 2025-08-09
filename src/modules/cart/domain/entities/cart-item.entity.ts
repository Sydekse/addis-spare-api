import { AggregateRoot } from '@nestjs/cqrs';

export class CartItem extends AggregateRoot {
  private productId: string;
  private quantity: number;
  private price: number;
  private compatibilityNote: string;
  private addedAt: Date;

  constructor(
    productId: string,
    quantity: number,
    price: number,
    compatibilityNote: string,
    addedAt: Date,
  ) {
    super();
    this.productId = productId;
    this.quantity = quantity;
    this.price = price;
    this.compatibilityNote = compatibilityNote;
    this.addedAt = addedAt;
  }

  public static create(
    productId: string,
    quantity: number,
    price: number,
    compatibilityNote: string = '',
    addedAt: Date = new Date(),
  ): CartItem {
    return new CartItem(productId, quantity, price, compatibilityNote, addedAt);
  }

  public getProductId(): string {
    return this.productId;
  }
  public getQuantity(): number {
    return this.quantity;
  }
  public getPrice(): number {
    return this.price;
  }
  public getCompatibilityNote(): string {
    return this.compatibilityNote;
  }
  public getAddedAt(): Date {
    return this.addedAt;
  }
}
