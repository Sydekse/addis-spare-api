import { AggregateRoot } from '@nestjs/cqrs';
import { CartItem } from './cart-item.entity';

export class Cart extends AggregateRoot {
  private id: string;
  private userId: string | null;
  private sessionId: string | null;
  private items: CartItem[];
  private couponCode: string | null;
  private discountAmount: number;
  private createdAt: Date;
  private updatedAt: Date;
  private expiresAt: Date;

  constructor(
    id: string,
    userId: string | null,
    sessionId: string | null,
    items: CartItem[],
    couponCode: string | null,
    discountAmount: number,
    createdAt: Date,
    updatedAt: Date,
    expiresAt: Date,
  ) {
    super();
    this.id = id;
    this.userId = userId;
    this.sessionId = sessionId;
    this.items = items;
    this.couponCode = couponCode;
    this.discountAmount = discountAmount;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.expiresAt = expiresAt;
  }

  public getId(): string {
    return this.id;
  }
  public getUserId(): string | null {
    return this.userId;
  }
  public getSessionId(): string | null {
    return this.sessionId;
  }
  public getItems(): CartItem[] {
    return this.items;
  }
  public getCouponCode(): string | null {
    return this.couponCode;
  }
  public getDiscountAmount(): number {
    return this.discountAmount;
  }
  public getCreatedAt(): Date {
    return this.createdAt;
  }
  public getUpdatedAt(): Date {
    return this.updatedAt;
  }
  public getExpiresAt(): Date {
    return this.expiresAt;
  }

  public static create(
    id: string,
    userId: string | null,
    sessionId: string | null,
    items: CartItem[],
    couponCode: string | null,
    discountAmount: number,
    createdAt: Date,
    updatedAt: Date,
    expiresAt: Date,
  ): Cart {
    return new Cart(
      id,
      userId,
      sessionId,
      items,
      couponCode,
      discountAmount,
      createdAt,
      updatedAt,
      expiresAt,
    );
  }

  // You can add methods for updating cart, adding/removing items, applying coupon, etc.

  public clearItems(): void {
    this.items = [];
  }
}
