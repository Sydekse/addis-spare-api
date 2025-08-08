import { AggregateRoot } from '@nestjs/cqrs';
import { RatingUpdatedEvent } from '../events/rating-updated.event';
import { RatingCreatedEvent } from '../events/rating-created.event';

export class Rating extends AggregateRoot {
  private id: string;
  private userId: string;
  private productId: string;
  private score: number;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(id: string, userId: string, productId: string, score: number) {
    super();
    this.id = id;
    this.userId = userId;
    this.productId = productId;
    this.score = score;
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

  public getScore(): number {
    return this.score;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public update(userId: string, productId: string, score: number): void {
    this.userId = userId;
    this.productId = productId;
    this.score = score;
    this.updatedAt = new Date();
    this.apply(new RatingUpdatedEvent(this));
  }

  public static create(
    id: string,
    userId: string,
    productId: string,
    score: number,
  ): Rating {
    const rating = new Rating(id, userId, productId, score);
    rating.apply(new RatingCreatedEvent(rating));
    return rating;
  }
}
