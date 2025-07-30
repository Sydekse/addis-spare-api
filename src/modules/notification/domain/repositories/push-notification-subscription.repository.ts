import { PushNotificationSubscription } from '../entities/push-notification-subscription.repository';

export const PUSH_NOTIFICATION_SUBSCRIPTION_REPOSITORY = Symbol.for(
  'PushNotificationSubscriptionRepository',
);
export interface PushNotificationSubscriptionRepository {
  findById(id: string): Promise<PushNotificationSubscription | null>;
  findByUserId(userId: string): Promise<PushNotificationSubscription | null>;
  findAll(): Promise<PushNotificationSubscription[]>;
  save(module: PushNotificationSubscription): Promise<void>;
  update(module: PushNotificationSubscription): Promise<void>;
  delete(id: string): Promise<void>;
}
