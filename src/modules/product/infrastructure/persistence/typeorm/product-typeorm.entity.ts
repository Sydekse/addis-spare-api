import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

class CompatibilityData {
  make: string;
  model: string;
  year: number;
}

@Entity('products')
export class ProductTypeOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 500 })
  description: string;

  @Column({ unique: true })
  sku: string;

  @Column()
  brand: string;

  @Column()
  category: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column('simple-array', { nullable: true, default: [] })
  images: string[];

  @Column('jsonb', { default: {} })
  attributes: Record<string, any>;

  @Column('simple-array', { nullable: true, default: [] })
  tags: string[];

  @Column()
  stockControlled: boolean;

  @Column({
    name: 'search_vector',
    type: 'tsvector',
    select: false,
    nullable: true,
  })
  searchVector: string;

  @Column({
    name: 'compatibility',
    type: 'jsonb',
  })
  compatibility: CompatibilityData[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
