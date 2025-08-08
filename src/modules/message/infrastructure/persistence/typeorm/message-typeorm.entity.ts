import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('messages')
export class MessageTypeormEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  conversationId: string;

  @Column({ type: 'uuid' })
  senderId: string;

  @Column({ type: 'uuid' })
  recipientId: string;

  @Column({ type: 'text' })
  body: string;

  @Column({ type: 'json' })
  attachments: string[];

  @Column()
  sentAt: Date;

  @Column({ nullable: true })
  readAt?: Date;
}
