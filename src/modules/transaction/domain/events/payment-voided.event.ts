import { Transaction } from "../entity/transaction.entity";

export class PaymentVoidedEvent {
  constructor(
    public transaction : Transaction
  ) {}
}