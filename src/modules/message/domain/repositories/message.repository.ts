import { Message } from '../entities/message.entity';

export const MESSAGE_REPOSITORY = Symbol.for('MessageRepository');

export interface MessageRepository {
  findById(id: string): Promise<Message | null>;

  findAll(): Promise<Message[]>;

  save(module: Message): Promise<void>;

  update(module: Message): Promise<void>;

  findByThread(conversationId: string): Promise<Message[]>;

  delete(id: string): Promise<void>;

  findConversations(userId: string): Promise<Message[]>;
}
