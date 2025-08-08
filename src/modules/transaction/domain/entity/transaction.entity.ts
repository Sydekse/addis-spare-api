import { TransactionStatus, TransactionType } from "./enums";

export class Transaction {
  constructor(
    private id: string,
    private orderId: string,
    private amount: number,
    private currency: string,
    private type: TransactionType,
    private status: TransactionStatus,
    private gatewayResponse: string,
    private createdAt: Date,
    private updatedAt: Date,
  ) {}

  // Getters
  getId(): string { return this.id; }
  getOrderId(): string { return this.orderId; }
  getAmount(): number { return this.amount; }
  getCurrency(): string { return this.currency; }
  getType(): TransactionType { return this.type; }
  getStatus(): TransactionStatus { return this.status; }
  getGatewayResponse(): string { return this.gatewayResponse; }
  getCreatedAt(): Date { return this.createdAt; }
  getUpdatedAt(): Date { return this.updatedAt; }

  // Business logic
  validateAgainstOrderTotal(orderTotal: number): void {
    if (this.amount !== orderTotal) {
      throw new Error('Transaction amount does not match order total');
    }
    if (this.currency !== 'ETB') {
      throw new Error('Unsupported currency');
    }
  }

  canRefund(): boolean {
    return this.type === TransactionType.CAPTURE && this.status === TransactionStatus.COMPLETED;
  }

  canVoid(): boolean {
    return this.type === TransactionType.CAPTURE && this.status === TransactionStatus.PENDING;
  }

  complete(): void {
    this.status = TransactionStatus.COMPLETED;
    this.updatedAt = new Date();
  }

  fail(response: string): void {
    this.status = TransactionStatus.FAILED;
    this.gatewayResponse = response;
    this.updatedAt = new Date();
  }
}