import { Transaction } from "../entity/transaction.entity";

export interface TransactionRepository {
    save(transaction : Transaction) : Promise<void>;
    findById(id : string ) : Promise<Transaction | null>;
    findByOrderId(orderId : string) : Promise<Transaction[] | null>;
}