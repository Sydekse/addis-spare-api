import { AggregateRoot } from '@nestjs/cqrs';

import { OrderUpdatedEvent } from '../events/order-updated.event';
import { OrderCreatedEvent } from '../events/order-created.event';
import { OrderStatus } from '../../application/dto/create-order.dto';

class OrderInventory {
  id: string;
  quantity: number;
}

export class OrderItem {
  public constructor(
    productId: string,
    sku: string,
    name: string,
    quantity: number,
    unitPrice: number,
    inventories: OrderInventory[],
  ) {
    this.productId = productId;
    this.sku = sku;
    this.name = name;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
    this.inventories = inventories;
  }

  productId: string;
  sku: string;
  name: string;
  quantity: number;
  unitPrice: number;
  inventories: OrderInventory[];
}

class OrderDiscount {
  code: string;
  amount: number;
}

export class Order extends AggregateRoot {
  id: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shippingFee: number;
  discounts?: OrderDiscount[];
  total: number;
  status: OrderStatus;
  placedAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    userId: string,
    items: OrderItem[],
    subtotal: number,
    tax: number,
    shippingFee: number,
    total: number,
    status: OrderStatus,
    discounts?: OrderDiscount[],
  ) {
    super();
    this.id = id;
    this.userId = userId;
    this.items = items;
    this.subtotal = subtotal;
    this.shippingFee = shippingFee;
    this.tax = tax;
    this.discounts = discounts;
    this.total = total;
    this.status = status;
    this.placedAt = new Date();
    this.updatedAt = new Date();
  }

  public getPlacedAt(): Date {
    return this.placedAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public getStatus(): OrderStatus {
    return this.status;
  }

  public getTotal(): number {
    return this.total;
  }

  public getDiscounts(): OrderDiscount[] | undefined {
    return this.discounts;
  }

  public getTax(): number {
    return this.tax;
  }

  public getShippingFee(): number {
    return this.shippingFee;
  }

  public getSubtotal(): number {
    return this.subtotal;
  }

  public getItems(): OrderItem[] {
    return this.items;
  }

  public getId(): string {
    return this.id;
  }

  public getUserId(): string {
    return this.userId;
  }

  public changeStatus(status: OrderStatus): void {
    this.status = status;
    this.updatedAt = new Date();
    this.apply(new OrderUpdatedEvent(this));
  }

  public update(
    userId: string,
    items: OrderItem[],
    subtotal: number,
    tax: number,
    shippingFee: number,
    total: number,
    status: OrderStatus,
    discounts?: OrderDiscount[],
  ): void {
    this.userId = userId;
    this.items = items;
    this.subtotal = subtotal;
    this.tax = tax;
    this.shippingFee = shippingFee;
    this.status = status;
    this.total = total;
    this.discounts = discounts;
    this.updatedAt = new Date();
    this.apply(new OrderUpdatedEvent(this));
  }

  public static create(
    id: string,
    userId: string,
    items: OrderItem[],
    subtotal: number,
    tax: number,
    shippingFee: number,
    total: number,
    status: OrderStatus,
    discounts?: OrderDiscount[],
  ): Order {
    const order = new Order(
      id,
      userId,
      items,
      subtotal,
      tax,
      shippingFee,
      total,
      status,
      discounts,
    );
    order.apply(new OrderCreatedEvent(order));
    return order;
  }
}
