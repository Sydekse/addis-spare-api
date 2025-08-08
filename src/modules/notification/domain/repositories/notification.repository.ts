import { Notification } from '../entities/notification.entity';

export const NOTIFICATION_REPOSITORY = Symbol.for('NotificationRepository');
export interface NotificationRepository {
  findById(id: string): Promise<Notification | null>;
  findAll(): Promise<Notification[]>;
  save(module: Notification): Promise<void>;
  findInAppForUser(userId: string): Promise<Notification[]>;
  update(module: Notification): Promise<void>;
  delete(id: string): Promise<void>;
}
