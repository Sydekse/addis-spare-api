import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Notification } from '../../../domain/entities/notification.entity';
import {
  NOTIFICATION_REPOSITORY,
  NotificationRepository,
} from '../../../domain/repositories/notification.repository';
import { CreateNotificationDto } from '../../dto/create-notification.dto';
import { PWDSubscribeDto } from '../../dto/pwd-subscribe.dto';
import {
  PUSH_NOTIFICATION_SUBSCRIPTION_REPOSITORY,
  PushNotificationSubscriptionRepository,
} from 'src/modules/notification/domain/repositories/push-notification-subscription.repository';
import { PushNotificationSubscription } from 'src/modules/notification/domain/entities/push-notification-subscription.repository';

@Injectable()
export class CreatePushNotificationUseCase {
  constructor(
    @Inject(PUSH_NOTIFICATION_SUBSCRIPTION_REPOSITORY)
    private readonly subscriptionRepository: PushNotificationSubscriptionRepository,
  ) {}

  async execute(
    userId: string,
    dto: PWDSubscribeDto,
  ): Promise<PushNotificationSubscription> {
    const subscription = PushNotificationSubscription.create(
      uuidv4(),
      userId,
      dto.endpoint,
      dto.p256dh,
      dto.auth,
      new Date(),
      new Date(),
    );

    await this.subscriptionRepository.save(subscription);
    return subscription;
  }
}
