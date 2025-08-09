import { AggregateRoot } from '@nestjs/cqrs';
import { v4 as uuidv4 } from 'uuid';

export class Review extends AggregateRoot {
  private id: string;
  private userId: string;
  private productId: string;
  private body: string;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(userId: string, productId: string, body: string, id?: string) {
    super();
    this.id = id || uuidv4();
    this.userId = userId;
    this.productId = productId;
    this.body = body;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  public getId(): string {
    return this.id;
  }
  public getUserId(): string {
    return this.userId;
  }
  public getProductId(): string {
    return this.productId;
  }
  public getBody(): string {
    return this.body;
  }
  public getCreatedAt(): Date {
    return this.createdAt;
  }
  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public static create(
    userId: string,
    productId: string,
    body: string,
    id?: string,
  ): Review {
    return new Review(userId, productId, body, id);
  }
  public update(body: string): void {
    this.body = body;
    this.updatedAt = new Date();
  }
  public delete(): void {
    this.body = '';
    this.updatedAt = new Date();
  }
}
