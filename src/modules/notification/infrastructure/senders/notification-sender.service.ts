import { User } from 'src/modules/users/domain/entity/user.entity';
import { Notification } from '../../domain/entities/notification.entity';

export class NotificationSender {
  public send(notification: Notification, user: User) {
    console.log(
      `Sending notification to user ${user.getId()} with message: ${notification.getMessage()}`,
    );
  }
}
