import { ProductTypeOrmEntity } from 'src/modules/product/infrastructure/persistence/typeorm/product-typeorm.entity';
import { UserTypeOrmEntity } from 'src/modules/users/infrastructure/typeorm/user-typeorm.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('ratings')
export class RatingTypeOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  score: number;

  @Column('uuid')
  productId: string;

  @Column('uuid')
  userId: string;

  @ManyToOne(() => ProductTypeOrmEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'productId' })
  product: ProductTypeOrmEntity;

  @ManyToOne(() => UserTypeOrmEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: UserTypeOrmEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
