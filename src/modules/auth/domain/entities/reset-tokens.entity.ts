import { AggregateRoot } from '@nestjs/cqrs';
import { ModuleCreatedEvent } from '../events/module-created.event';
import { ModuleUpdatedEvent } from '../events/module-updated.event';

// Password reset token
export class ResetToken extends AggregateRoot {
  private id: string;
  private userId: string;
  private resetToken: string;
  private expiryDate: Date;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(
    id: string,
    userId: string,
    resetToken: string,
    expiryDate: Date,
  ) {
    super();
    this.id = id;
    this.userId = userId;
    this.resetToken = resetToken;
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

  public getResetToken(): string {
    return this.resetToken;
  }

  public update(userId: string, resetToken: string, expiryDate: Date) {
    this.userId = userId;
    this.resetToken = resetToken;
    this.expiryDate = expiryDate;
    this.updatedAt = new Date();
    this.apply(new ModuleUpdatedEvent(this));
  }

  public static create(
    id: string,
    userId: string,
    resetToken: string,
    expiryDate: Date,
  ): ResetToken {
    const module = new ResetToken(id, userId, resetToken, expiryDate);
    module.apply(new ModuleCreatedEvent(module));
    return module;
  }
}
