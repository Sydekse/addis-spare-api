import { Notification } from '../entities/notification.entity';

export class NotificationUpdatedEvent {
  constructor(public readonly module: Notification) {}
}
