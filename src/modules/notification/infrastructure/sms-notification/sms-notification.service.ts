import { User } from 'src/modules/users/domain/entity/user.entity';
import { Notification } from '../../domain/entities/notification.entity';
import { NotificationSender } from '../senders/notification-sender.service';

export class SMSNotificationService extends NotificationSender {
  // eslint-disable-next-line
  override send(_notification: Notification, _user: User): Promise<void> {
    return Promise.reject(new Error('SMS notifications are not supported yet'));
  }
}
