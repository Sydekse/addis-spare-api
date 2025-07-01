import { AggregateRoot } from '@nestjs/cqrs';
import { ProductCreatedEvent } from '../events/product-created.event';
import { ProductUpdatedEvent } from '../events/product-updated.event';

export class Product extends AggregateRoot {
  private id: string;
  private name: string;
  private description: string;
  private sku: string;
  private brand: string;
  private category: string;
  private price: number;
  private images: string[];
  private attributes: string[];
  private tags: string[];
  private stockControlled: boolean;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(
    id: string,
    name: string,
    description: string,
    sku: string,
    brand: string,
    category: string,
    price: number,
    images: string[],
    attributes: string[],
    tags: string[],
    stockControlled: boolean,
  ) {
    super();
    this.id = id;
    this.name = name;
    this.description = description;
    this.sku = sku;
    this.brand = brand;
    this.category = category;
    this.price = price;
    this.images = images;
    this.attributes = attributes || [];
    this.tags = tags || [];
    this.stockControlled = stockControlled;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getDescription(): string {
    return this.description;
  }

  public getBrand(): string {
    return this.brand;
  }

  public getStockControlled(): boolean {
    return this.stockControlled;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public getSku(): string {
    return this.sku;
  }

  public getCategory(): string {
    return this.category;
  }

  public getPrice(): number {
    return this.price;
  }

  public getTags(): string[] {
    return this.tags;
  }

  public getAttributes(): string[] {
    return this.attributes;
  }

  public getImages(): string[] {
    return this.images;
  }

  public update(
    name: string,
    description: string,
    sku: string,
    brand: string,
    category: string,
    price: number,
    images: string[],
    attributes: string[],
    tags: string[],
    stockControlled: boolean,
  ): void {
    this.name = name;
    this.description = description;
    this.updatedAt = new Date();
    this.sku = sku;
    this.brand = brand;
    this.category = category;
    this.tags = tags;
    this.price = price;
    this.stockControlled = stockControlled;
    this.attributes = attributes;
    this.images = images;
    this.apply(new ProductUpdatedEvent(this));
  }

  public static create(
    id: string,
    name: string,
    description: string,
    sku: string,
    brand: string,
    category: string,
    price: number,
    images: string[],
    attributes: string[],
    tags: string[],
    stockControlled: boolean,
  ): Product {
    const product = new Product(
      id,
      name,
      description,
      sku,
      brand,
      category,
      price,
      images,
      attributes,
      tags,
      stockControlled,
    );
    product.apply(new ProductCreatedEvent(product));
    return product;
  }
}
