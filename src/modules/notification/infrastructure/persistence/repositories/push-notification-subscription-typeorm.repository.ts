import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Notification,
  NotificationChannel,
} from '../../../domain/entities/notification.entity';
import { NotificationRepository } from '../../../domain/repositories/notification.repository';
import { NotificationTypeOrmEntity } from '../typeorm/notification-type-orm.entity';
import { PushNotificationSubscriptionRepository } from 'src/modules/notification/domain/repositories/push-notification-subscription.repository';

@Injectable()
export class PushNotificationSubscriptionTypeormRepository
  implements PushNotificationSubscriptionRepository
{
  constructor(
    @InjectRepository(NotificationTypeOrmEntity)
    private readonly repository: Repository<NotificationTypeOrmEntity>,
  ) {}
  findByUserId(userId: string): Promise<Notification | null> {
    throw new Error('Method not implemented.');
  }
  async findInAppForUser(userId: string): Promise<Notification[]> {
    const entities = await this.repository.find({
      where: {
        userId,
        channel: NotificationChannel.IN_APP,
      },
    });

    return entities.map((entity) => this.newNotification(entity));
  }

  async findById(id: string): Promise<Notification | null> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) return null;
    return this.newNotification(entity);
  }

  async findAll(): Promise<Notification[]> {
    const entities = await this.repository.find();
    return entities.map((entity) => this.newNotification(entity));
  }

  async save(notification: Notification): Promise<void> {
    const entity = new NotificationTypeOrmEntity();
    entity.id = notification.getId();
    entity.userId = notification.getUserId();
    entity.channel = notification.getChannel();
    entity.subject = notification.getSubject();
    entity.message = notification.getMessage();
    entity.status = notification.getStatus();
    entity.relatedTo = notification.getRelatedTo();
    entity.sentAt = notification.getSentAt();
    entity.createdAt = notification.getCreatedAt();

    await this.repository.save(entity);
  }

  async update(notification: Notification): Promise<void> {
    const entity = await this.repository.findOne({
      where: { id: notification.getId() },
    });
    if (!entity) throw new Error('Module not found');

    entity.id = notification.getId();
    entity.userId = notification.getUserId();
    entity.channel = notification.getChannel();
    entity.subject = notification.getSubject();
    entity.message = notification.getMessage();
    entity.status = notification.getStatus();
    entity.relatedTo = notification.getRelatedTo();
    entity.sentAt = notification.getSentAt();

    await this.repository.save(entity);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  private newNotification(entity: NotificationTypeOrmEntity): Notification {
    return new Notification(
      entity.id,
      entity.userId,
      entity.channel,
      entity.subject,
      entity.message,
      entity.status,
      entity.relatedTo,
    );
  }
}
