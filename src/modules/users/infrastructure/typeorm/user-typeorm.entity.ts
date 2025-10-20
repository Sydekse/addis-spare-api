import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole, SupplierDetails } from '../../domain/entity/user-data-types';

@Entity('users')
export class UserTypeOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 255 })
  passwordHash: string;

  @Column('jsonb', { nullable: true })
  contact: {
    phone: string;
    city: string;
    country: string;
  } | null;

  @Column({ type: 'boolean', default: false })
  isOnboarded: boolean;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'jsonb', nullable: true })
  supplierDetails: SupplierDetails | null;

  @UpdateDateColumn()
  updatedAt: Date;
}
