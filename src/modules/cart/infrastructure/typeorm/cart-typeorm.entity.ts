import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CartItem } from '../../domain/entities/cart-item.entity';

@Entity('carts')
export class CartTypeOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: true, unique: true })
  userId: string | null;

  @Column('jsonb', { nullable: false })
  items: CartItem[] | null;

  @Column({ type: 'uuid', nullable: true })
  sessionId: string | null;

  @Column({ type: 'varchar', nullable: true })
  couponCode: string | null;

  @Column({ type: 'decimal', default: 0 })
  discountAmount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: false })
  expiresAt: Date;
}
