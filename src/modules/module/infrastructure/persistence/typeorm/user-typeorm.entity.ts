import {
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    CreateDateColumn, 
    UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UserTypeOrmEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 100 })
    name: string;

    @Column({ length: 100, unique: true })
    email: string;

    @Column({ length: 255 })
    password: string;

    @Column({ length: 15, nullable: true })
    phone: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}