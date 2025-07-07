import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import {
  IsUUID,
  IsNumber,
  Min,
  IsArray,
  ArrayMinSize,
  ValidateNested,
  IsOptional,
  IsEnum,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UserTypeOrmEntity } from 'src/modules/users/infrastructure/typeorm/user-typeorm.entity';

enum OrderStatus {
  PENDING = 'pending',
  PAID = 'paid',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

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
}

class OrderDiscount {
  code: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  amount: number;
}

@Entity('orders')
export class OrderTypeOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserTypeOrmEntity, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: UserTypeOrmEntity;

  @IsUUID()
  @Column('uuid')
  userId: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => OrderItem)
  @Column('jsonb')
  items: OrderItem[];

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Column('numeric', { precision: 10, scale: 2 })
  subtotal: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Column('numeric', { precision: 10, scale: 2 })
  tax: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Column('numeric', { precision: 10, scale: 2 })
  shippingFee: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderDiscount)
  @Column('jsonb', { nullable: true })
  discounts?: OrderDiscount[];

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Column('numeric', { precision: 10, scale: 2 })
  total: number;

  @IsEnum(OrderStatus)
  @Column({ type: 'enum', enum: OrderStatus })
  status: OrderStatus;

  @IsDate()
  @CreateDateColumn()
  placedAt: Date;

  @IsDate()
  @UpdateDateColumn()
  updatedAt: Date;
}
