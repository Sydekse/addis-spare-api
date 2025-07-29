import { User } from 'src/modules/users/domain/entity/user.entity';
import { Notification } from '../../domain/entities/notification.entity';

export class NotificationSender {
  public async send(notification: Notification, user: User) {}
}
