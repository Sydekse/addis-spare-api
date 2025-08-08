import { Injectable, Inject, Logger } from '@nestjs/common';
import * as webPush from 'web-push';
import { User } from 'src/modules/users/domain/entity/user.entity';
import { Notification } from '../../domain/entities/notification.entity';
import { NotificationSender } from '../senders/notification-sender.service';
import {
  PUSH_NOTIFICATION_SUBSCRIPTION_REPOSITORY,
  PushNotificationSubscriptionRepository,
} from '../../domain/repositories/push-notification-subscription.repository';
// Define PushSubscription shape if your repository doesn't use the built-in type
import { PushSubscription } from 'web-push';

@Injectable()
export class InAppNotificationService extends NotificationSender {
  private readonly logger = new Logger(InAppNotificationService.name);

  constructor(
    @Inject(PUSH_NOTIFICATION_SUBSCRIPTION_REPOSITORY)
    private readonly subscriptionRepository: PushNotificationSubscriptionRepository,
  ) {
    super();

    // Set your VAPID keys (ensure they are present at runtime)
    const email = process.env.EMAIL;
    const publicKey = process.env.VAPID_PUBLIC_KEY;
    const privateKey = process.env.VAPID_PRIVATE_KEY;

    if (!email || !publicKey || !privateKey) {
      throw new Error(
        'VAPID configuration is missing from environment variables',
      );
    }

    webPush.setVapidDetails(email, publicKey, privateKey);
  }

  public override async send(
    notification: Notification,
    user: User,
  ): Promise<void> {
    const subscription = await this.subscriptionRepository.findByUserId(
      user.getId(),
    );

    if (!subscription) {
      this.logger.warn(`No push subscription found for user ${user.getId()}`);
      throw new Error('Subscription not found');
    }

    const typedSubscription: PushSubscription = {
      endpoint: subscription.getEndpoint(),
      keys: {
        auth: subscription.getAuth(),
        p256dh: subscription.getP256dh(),
      },
    };

    const payload = JSON.stringify({
      title: notification.getSubject(),
      body: notification.getMessage(),
      data: notification.getMessage() || {},
    });

    try {
      await webPush.sendNotification(typedSubscription, payload);
      this.logger.log(`Push notification sent to user ${user.getId()}`);
    } catch (err: any) {
      this.logger.error(
        `Failed to send push notification to user ${user.getId()}: ${err?.message}`,
      );

      if (err?.statusCode === 410 || err?.statusCode === 404) {
        await this.subscriptionRepository.delete(notification.getId());
        this.logger.warn(
          `Deleted expired subscription for user ${user.getId()}`,
        );
      }
    }
  }
}
