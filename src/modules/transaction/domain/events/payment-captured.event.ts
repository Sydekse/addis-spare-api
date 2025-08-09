import { Transaction } from '../entity/transaction.entity';

export class PaymentCapturedEvent {
  constructor(public transaction: Transaction) {}
}
