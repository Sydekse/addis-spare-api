import { Transaction } from '../entity/transaction.entity';

export const TRANSACTION_REPOSITORY = Symbol.for('TransactionRepository');

export interface TransactionRepository {
  save(transaction: Transaction): Promise<void>;
  findById(id: string): Promise<Transaction | null>;
  findByOrderId(orderId: string): Promise<Transaction[] | null>;
}
