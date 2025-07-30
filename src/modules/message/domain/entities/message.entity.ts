import { AggregateRoot } from '@nestjs/cqrs';
import { MessageCreatedEvent } from '../events/message-created.event';
import { MessageUpdatedEvent } from '../events/message-updated.event';

export class Message extends AggregateRoot {
  private id: string;
  private conversationId: string;
  private senderId: string;
  private recipientId: string;
  private body: string;
  private attachments: string[];
  private sentAt: Date;
  private readAt?: Date;

  constructor(
    id: string,
    conversationId: string,
    senderId: string,
    recipientId: string,
    body: string,
    attachments: string[],
    sentAt: Date,
    readAt?: Date,
  ) {
    super();
    this.id = id;
    this.conversationId = conversationId;
    this.senderId = senderId;
    this.recipientId = recipientId;
    this.body = body;
    this.attachments = attachments;
    this.sentAt = sentAt;
    this.readAt = readAt;
  }

  public static create(
    id: string,
    conversationId: string,
    senderId: string,
    recipientId: string,
    body: string,
    attachments: string[],
    sentAt: Date,
  ): Message {
    const message = new Message(
      id,
      conversationId,
      senderId,
      recipientId,
      body,
      attachments,
      sentAt,
    );
    message.apply(new MessageCreatedEvent(message));
    return message;
  }

  public getId(): string {
    return this.id;
  }

  public getConversationId(): string {
    return this.conversationId;
  }

  public getSenderId(): string {
    return this.senderId;
  }

  public getRecipientId(): string {
    return this.recipientId;
  }

  public getBody(): string {
    return this.body;
  }

  public getAttachments(): string[] {
    return this.attachments;
  }

  public getSentAt(): Date {
    return this.sentAt;
  }

  public getReadAt(): Date | undefined {
    return this.readAt;
  }

  public read() {
    this.readAt = new Date();
    this.apply(new MessageUpdatedEvent(this));
  }

  public update(
    id: string,
    conversationId: string,
    senderId: string,
    recipientId: string,
    body: string,
    attachments: string[],
    sentAt: Date,
    readAt?: Date,
  ) {
    this.conversationId = conversationId;
    this.senderId = senderId;
    this.recipientId = recipientId;
    this.body = body;
    this.attachments = attachments;
    this.sentAt = sentAt;
    this.readAt = readAt;
    this.apply(new MessageUpdatedEvent(this));
  }
}
