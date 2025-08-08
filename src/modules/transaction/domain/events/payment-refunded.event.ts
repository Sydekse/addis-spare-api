import { Transaction } from "../entity/transaction.entity";

export class PaymentRefundedEvent {
  constructor(
    public transaction : Transaction
  ) {}
}