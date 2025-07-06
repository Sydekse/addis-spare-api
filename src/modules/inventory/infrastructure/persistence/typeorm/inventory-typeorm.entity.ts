import { ProductTypeOrmEntity } from 'src/modules/product/infrastructure/persistence/typeorm/product-typeorm.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('inventories')
export class InventoryTypeOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  productId: string;

  @ManyToOne(() => ProductTypeOrmEntity, { eager: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'productId' }) // Links the column to the entity
  product: ProductTypeOrmEntity;

  @Column()
  location: string;

  @Column({ type: 'int', default: 0 })
  quantity: number;

  @Column({ type: 'int', default: 0 })
  reorderThreshold: number;

  @Column({ type: 'uuid', nullable: true })
  supplierId?: string;

  @Column({ name: 'lastUpdated', type: 'timestamp' })
  lastUpdated: Date;
}
