import { AggregateRoot } from '@nestjs/cqrs';
import { NotificationCreatedEvent } from '../events/notification-created.event';
import { NotificationUpdatedEvent } from '../events/notification-updated.event';

export enum NotificationStatus {
  PENDING = 'PENDING',
  FAILED = 'FAILED',
  SENT = 'SENT',
}

export enum NotificationChannel {
  SMS = 'SMS',
  GMAIL = 'GMAIL',
  IN_APP = 'IN-APP',
}

export class NotificationRelatedTo {
  entity: string;
  id: string;
}

export class Notification extends AggregateRoot {
  private id: string;
  private userId: string;
  private channel: NotificationChannel;
  private subject: string;
  private message: string;
  private relatedTo?: NotificationRelatedTo;
  private status: NotificationStatus;
  private createdAt: Date;
  private sentAt: Date;

  constructor(
    id: string,
    userId: string,
    channel: NotificationChannel,
    subject: string,
    message: string,
    status: NotificationStatus,
    relatedTo?: NotificationRelatedTo,
  ) {
    super();
    this.id = id;
    this.userId = userId;
    this.channel = channel;
    this.subject = subject;
    this.message = message;
    this.status = status;
    this.relatedTo = relatedTo;
    this.createdAt = new Date();
    this.sentAt = new Date();
  }

  public static create(
    id: string,
    userId: string,
    channel: NotificationChannel,
    subject: string,
    message: string,
    status: NotificationStatus,
    relatedTo?: NotificationRelatedTo,
  ): Notification {
    const notification = new Notification(
      id,
      userId,
      channel,
      subject,
      message,
      status,
      relatedTo,
    );
    notification.apply(new NotificationCreatedEvent(notification));
    return notification;
  }

  public send() {
    this.sentAt = new Date();
    this.status = NotificationStatus.SENT;
  }

  public fail() {
    this.status = NotificationStatus.FAILED;
  }

  public getId(): string {
    return this.id;
  }

  public getUserId(): string {
    return this.userId;
  }

  public getChannel(): NotificationChannel {
    return this.channel;
  }

  public getSubject(): string {
    return this.subject;
  }

  public getMessage(): string {
    return this.message;
  }

  public getStatus(): NotificationStatus {
    return this.status;
  }

  public getRelatedTo(): NotificationRelatedTo | undefined {
    return this.relatedTo;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getSentAt(): Date {
    return this.sentAt;
  }

  public update(
    userId: string,
    channel: NotificationChannel,
    subject: string,
    message: string,
    status: NotificationStatus,
    createdAt: Date,
    sentAt: Date,
    relatedTo?: NotificationRelatedTo,
  ): void {
    this.userId = userId;
    this.channel = channel;
    this.subject = subject;
    this.message = message;
    this.status = status;
    this.relatedTo = relatedTo;
    this.createdAt = createdAt;
    this.sentAt = sentAt;
    this.apply(new NotificationUpdatedEvent(this));
  }
}
