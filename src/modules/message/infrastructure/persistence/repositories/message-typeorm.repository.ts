import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from '../../../domain/entities/message.entity';
import { MessageRepository } from '../../../domain/repositories/message.repository';
import { MessageTypeormEntity } from '../typeorm/message-typeorm.entity';

@Injectable()
export class MessageTypeormRepository implements MessageRepository {
  constructor(
    @InjectRepository(MessageTypeormEntity)
    private readonly repository: Repository<MessageTypeormEntity>,
  ) {}
  async findConversations(userId: string): Promise<Message[]> {
    // Find all messages where the user is either sender or recipient
    const entities = await this.repository
      .createQueryBuilder('message')
      .where('message.senderId = :userId OR message.recipientId = :userId', {
        userId,
      })
      .orderBy('message.sentAt', 'ASC') // optional: sort oldest → newest
      .getMany();

    // Convert TypeORM entities to domain Message entities
    return entities.map((entity) => this.newMessage(entity));
  }

  async findById(id: string): Promise<Message | null> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) return null;
    return this.newMessage(entity);
  }

  async findAll(): Promise<Message[]> {
    const entities = await this.repository.find();
    return entities.map((entity) => this.newMessage(entity));
  }

  async findByThread(conversationId: string): Promise<Message[]> {
    const entities = await this.repository.find({ where: { conversationId } });
    return entities.map((entity) => this.newMessage(entity));
  }

  async save(message: Message): Promise<void> {
    const entity = new MessageTypeormEntity();
    entity.id = message.getId();
    entity.conversationId = message.getConversationId();
    entity.senderId = message.getSenderId();
    entity.recipientId = message.getRecipientId();
    entity.body = message.getBody();
    entity.attachments = message.getAttachments();
    entity.sentAt = message.getSentAt();
    entity.readAt = message.getReadAt();

    await this.repository.save(entity);
  }

  async update(message: Message): Promise<void> {
    const entity = await this.repository.findOne({
      where: { id: message.getId() },
    });
    if (!entity) throw new Error('Module not found');

    entity.id = message.getId();
    entity.conversationId = message.getConversationId();
    entity.senderId = message.getSenderId();
    entity.recipientId = message.getRecipientId();
    entity.body = message.getBody();
    entity.attachments = message.getAttachments();
    entity.sentAt = message.getSentAt();
    entity.readAt = message.getReadAt();

    await this.repository.save(entity);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  private newMessage(entity: MessageTypeormEntity): Message {
    return new Message(
      entity.id,
      entity.conversationId,
      entity.senderId,
      entity.recipientId,
      entity.body,
      entity.attachments,
      entity.sentAt,
      entity.readAt,
    );
  }
}
