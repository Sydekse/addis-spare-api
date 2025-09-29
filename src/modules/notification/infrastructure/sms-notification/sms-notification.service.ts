import { User } from 'src/modules/users/domain/entity/user.entity';
import { Notification } from '../../domain/entities/notification.entity';
import { NotificationSender } from '../senders/notification-sender.service';

export class SMSNotificationService extends NotificationSender {
  override send(notification: Notification, user: User): Promise<void> {
    return Promise.reject(new Error('SMS notifications are not supported yet'));
  }
}
