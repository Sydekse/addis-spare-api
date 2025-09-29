import { AggregateRoot } from '@nestjs/cqrs';
import { ModuleCreatedEvent } from '../events/module-created.event';
import { ModuleUpdatedEvent } from '../events/module-updated.event';

// auth refresh token
export class RefreshToken extends AggregateRoot {
  private id: string;
  private userId: string;
  private refreshToken: string;
  private expiryDate: Date;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(
    id: string,
    userId: string,
    refreshToken: string,
    expiryDate: Date,
  ) {
    super();
    this.id = id;
    this.userId = userId;
    this.refreshToken = refreshToken;
    this.expiryDate = expiryDate;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  public getId(): string {
    return this.id;
  }

  public getUserId(): string {
    return this.userId;
  }

  public getExpiryDate(): Date {
    return this.expiryDate;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public getRefreshToken(): string {
    return this.refreshToken;
  }

  public update(userId: string, refreshToken: string, expiryDate: Date) {
    this.userId = userId;
    this.refreshToken = refreshToken;
    this.expiryDate = expiryDate;
    this.updatedAt = new Date();
    this.apply(new ModuleUpdatedEvent(this));
  }

  public static create(
    id: string,
    userId: string,
    refreshToken: string,
    expiryDate: Date,
  ): RefreshToken {
    const module = new RefreshToken(id, userId, refreshToken, expiryDate);
    module.apply(new ModuleCreatedEvent(module));
    return module;
  }
}
