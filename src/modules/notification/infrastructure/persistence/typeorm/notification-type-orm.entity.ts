import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

enum NotificationStatus {
  PENDING = 'PENDING',
  FAILED = 'FAILED',
  SENT = 'SENT',
}

enum NotificationChannel {
  SMS = 'SMS',
  GMAIL = 'GMAIL',
  IN_APP = 'IN-APP',
}

class NotificationRelatedTo {
  entity: string;
  id: string;
}

@Entity('notifications')
export class NotificationTypeOrmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({
    type: 'enum',
    enum: NotificationChannel,
  })
  channel: NotificationChannel;

  @Column({ length: 255 })
  subject: string;

  @Column({ type: 'text' })
  message: string;

  @Column({
    type: 'enum',
    enum: NotificationStatus,
  })
  status: NotificationStatus;

  @Column({ type: 'json', nullable: true })
  relatedTo?: NotificationRelatedTo;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  sentAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
