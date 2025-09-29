import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  NOTIFICATION_REPOSITORY,
  NotificationRepository,
} from '../../../domain/repositories/notification.repository';
import { NotificationChannel } from '../../../domain/entities/notification.entity';
import { SMSNotificationService } from 'src/modules/notification/infrastructure/sms-notification/sms-notification.service';
import { InAppNotificationService } from 'src/modules/notification/infrastructure/in-app-notification/in-app-notification.service';
import { EmailNotificationService } from 'src/modules/notification/infrastructure/email-notification/email-notification.service';
import {
  USER_REPOSITORY,
  UserRepository,
} from 'src/modules/users/domain/repository/user.repository';

@Injectable()
export class SendNotificationUseCase {
  constructor(
    @Inject(NOTIFICATION_REPOSITORY)
    private readonly notificationRepository: NotificationRepository,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    private readonly smsNotificationService: SMSNotificationService,
    private readonly inappNotificationService: InAppNotificationService,
    private readonly emailNotificationService: EmailNotificationService,
  ) {}

  async execute(id: string): Promise<void> {
    const notification = await this.notificationRepository.findById(id);
    if (!notification) {
      throw new NotFoundException('notification is not found');
    }

    const user = await this.userRepository.findById(notification.getUserId());
    if (!user) {
      throw new NotFoundException('user is not found');
    }

    try {
      switch (notification.getChannel()) {
        case NotificationChannel.GMAIL:
          await this.emailNotificationService.send(notification, user);
          break;
        case NotificationChannel.IN_APP:
          await this.inappNotificationService.send(notification, user);
          break;
        case NotificationChannel.SMS:
          await this.smsNotificationService.send(notification, user);
          break;
      }
    } catch (e) {
      notification.fail();
      await this.notificationRepository.update(notification);
      console.log('failed to send the notification: ', e);
      throw new InternalServerErrorException('failed to send the notification');
    }

    notification.send();
    await this.notificationRepository.update(notification);
  }
}
