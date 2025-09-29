import { AggregateRoot } from '@nestjs/cqrs';
import { v4 as uuidv4 } from 'uuid';
import {
  TransactionStatus,
  TransactionType,
} from 'src/modules/transaction/domain/entity/enums';

export class Transaction extends AggregateRoot {
  private id: string;
  private orderId: string;
  private amount: number;
  private currency: string;
  private type: TransactionType;
  private status: TransactionStatus;
  private gatewayResponse: string;
  private userId: string;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(
    id: string,
    orderId: string,
    amount: number,
    currency: string,
    type: TransactionType,
    status: TransactionStatus,
    userId: string,
    gatewayResponse: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    super();
    this.id = id || uuidv4();
    this.orderId = orderId;
    this.amount = amount;
    this.currency = currency;
    this.type = type;
    this.userId = userId;
    this.status = status || TransactionStatus.PENDING;
    this.gatewayResponse = gatewayResponse || '';
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public getUserId(): string {
    return this.userId;
  }

  // Factory method
  public static create(
    id: string,
    orderId: string,
    amount: number,
    currency: string,
    type: TransactionType,
    userId: string,
  ): Transaction {
    return new Transaction(
      id,
      orderId,
      amount,
      currency,
      type,
      TransactionStatus.PENDING,
      userId,
      '',
      new Date(),
      new Date(),
    );
  }

  // Getters
  public getId(): string {
    return this.id;
  }
  public getOrderId(): string {
    return this.orderId;
  }
  public getAmount(): number {
    return this.amount;
  }
  public getCurrency(): string {
    return this.currency;
  }
  public getType(): TransactionType {
    return this.type;
  }
  public getStatus(): TransactionStatus {
    return this.status;
  }
  public getGatewayResponse(): string {
    return this.gatewayResponse;
  }
  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public validateAgainstOrderTotal(orderTotal: number): void {
    if (this.amount !== orderTotal) {
      throw new Error('Transaction amount does not match order total');
    }
    if (this.currency !== 'ETB') {
      throw new Error('Unsupported currency');
    }
  }

  public canRefund(): boolean {
    return (
      this.type === TransactionType.CAPTURE &&
      this.status === TransactionStatus.COMPLETED
    );
  }

  public canVoid(): boolean {
    return (
      this.type === TransactionType.CAPTURE &&
      this.status === TransactionStatus.PENDING
    );
  }

  public initiate(gatewayResponse: string) {
    this.gatewayResponse = gatewayResponse;
    this.updatedAt = new Date();
  }

  public complete(): void {
    this.status = TransactionStatus.COMPLETED;
    this.updatedAt = new Date();
  }

  public fail(response: string): void {
    this.status = TransactionStatus.FAILED;
    this.gatewayResponse = response;
    this.updatedAt = new Date();
  }
}
