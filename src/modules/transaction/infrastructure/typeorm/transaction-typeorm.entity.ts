import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TransactionStatus, TransactionType } from '../../domain/entity/enums';

@Entity('transactions')
export class TransactionTypeOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  orderId: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({
    type: 'enum',
    enum: TransactionStatus,
    default: TransactionStatus.PENDING,
  })
  status: TransactionStatus;

  @Column({ length: 3 })
  currency: string;

  @Column()
  userId: string;

  @Column({
    type: 'enum',
    enum: TransactionType,
    default: TransactionType.CAPTURE,
  })
  type: TransactionType;

  @Column({ type: 'text' })
  gatewayResponse: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
