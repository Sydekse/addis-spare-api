import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { IsUUID, IsNumber, Min } from 'class-validator';
import { UserTypeOrmEntity } from 'src/modules/users/infrastructure/typeorm/user-typeorm.entity';
import { OrderStatus } from 'src/modules/order/application/dto/create-order.dto';

class OrderItem {
  @IsUUID()
  productId: string;

  sku: string;

  name: string;

  @Min(1)
  @Column('int')
  quantity: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  unitPrice: number;

  inventories: OrderInventory[];
}

class OrderDiscount {
  code: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  amount: number;
}

export class OrderInventory {
  public constructor(id: string, quantity: number) {
    this.id = id;
    this.quantity = quantity;
  }
  id: string;

  @IsNumber()
  @Min(1)
  quantity: number;
}

@Entity('orders')
export class OrderTypeOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserTypeOrmEntity, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: UserTypeOrmEntity;

  @Column('uuid')
  userId: string;

  @Column('jsonb')
  items: OrderItem[];

  @Column('numeric', { precision: 10, scale: 2, default: 0 })
  subtotal: number;

  @Column('numeric', { precision: 10, scale: 2, default: 0 })
  tax: number;

  @Column('numeric', { precision: 10, scale: 2, default: 0 })
  shippingFee: number;

  @Column('jsonb', { nullable: true })
  discounts?: OrderDiscount[];

  @Column('numeric', { precision: 10, scale: 2, default: 0 })
  total: number;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  @CreateDateColumn()
  placedAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
