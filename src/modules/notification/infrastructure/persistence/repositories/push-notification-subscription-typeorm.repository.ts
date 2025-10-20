import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PushNotificationSubscriptionRepository } from 'src/modules/notification/domain/repositories/push-notification-subscription.repository';
import { PushNotificationSubscription } from 'src/modules/notification/domain/entities/push-notification-subscription.repository';
import { PushNotificationSubscriptionTypeOrmEntity } from '../typeorm/push-notification-subscription-type-orm.entity';

@Injectable()
export class PushNotificationSubscriptionTypeormRepository
  implements PushNotificationSubscriptionRepository
{
  constructor(
    @InjectRepository(PushNotificationSubscriptionTypeOrmEntity)
    private readonly repository: Repository<PushNotificationSubscriptionTypeOrmEntity>,
  ) {}
  private newPushNotification(
    entity: PushNotificationSubscriptionTypeOrmEntity,
  ): PushNotificationSubscription {
    return new PushNotificationSubscription(
      entity.id,
      entity.userId,
      entity.auth,
      entity.endpoint,
      entity.p256dh,
      entity.createdAt,
      entity.updatedAt,
    );
  }
  async findById(id: string): Promise<PushNotificationSubscription | null> {
    const subscription = await this.repository.findOne({ where: { id } });
    if (!subscription) return null;
    return this.newPushNotification(subscription);
  }
  async findByUserId(
    userId: string,
  ): Promise<PushNotificationSubscription | null> {
    const entity = await this.repository.findOne({ where: { userId } });
    if (!entity) {
      return null;
    }
    return this.newPushNotification(entity);
  }
  async findAll(): Promise<PushNotificationSubscription[]> {
    const entities = await this.repository.find();
    return entities.map((entity) => this.newPushNotification(entity));
  }
  async save(subscription: PushNotificationSubscription): Promise<void> {
    const entity = new PushNotificationSubscriptionTypeOrmEntity();
    entity.id = subscription.getId();
    entity.userId = subscription.getUserId();
    entity.auth = subscription.getAuth();
    entity.p256dh = subscription.getP256dh();
    entity.createdAt = subscription.getCreatedAt();
    entity.updatedAt = subscription.getUpdatedAt();
    await this.repository.save(entity);
  }
  async update(subscription: PushNotificationSubscription): Promise<void> {
    const entity = await this.repository.findOne({
      where: { id: subscription.getId() },
    });
    if (!entity) {
      throw new Error('subscription not found');
    }
    entity.userId = subscription.getUserId();
    entity.auth = subscription.getAuth();
    entity.p256dh = subscription.getP256dh();
    entity.createdAt = subscription.getCreatedAt();
    entity.updatedAt = subscription.getUpdatedAt();
    await this.repository.save(entity);
  }
  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
