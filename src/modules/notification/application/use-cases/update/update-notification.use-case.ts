import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  Notification,
  NotificationRelatedTo,
} from '../../../domain/entities/notification.entity';
import {
  NOTIFICATION_REPOSITORY,
  NotificationRepository,
} from '../../../domain/repositories/notification.repository';
import { UpdateNotificationDto } from '../../dto/update-notification.dto';
import { NotificationStatus } from '../../dto/create-notification.dto';

@Injectable()
export class UpdateNotificationUseCase {
  constructor(
    @Inject(NOTIFICATION_REPOSITORY)
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async execute(
    id: string,
    dto: UpdateNotificationDto,
  ): Promise<Notification | null> {
    const notification = await this.notificationRepository.findById(id);
    if (!notification) {
      throw new NotFoundException('notification is not found');
    }

    const relatedTo = new NotificationRelatedTo();
    if (dto.relatedTo) {
      relatedTo.id = dto.relatedTo.id || '';
      relatedTo.entity = dto.relatedTo.entity || '';
    }

    if (
      dto.status != notification.getStatus() &&
      dto.status != NotificationStatus.PENDING
    ) {
      throw new BadRequestException('status is not pending');
    }

    notification.update(
      dto.userId,
      dto.channel,
      dto.subject,
      dto.message,
      dto.status,
      notification.getCreatedAt(),
      dto.sentAt,
      dto.relatedTo ? relatedTo : undefined,
    );
    await this.notificationRepository.update(notification);

    return notification;
  }
}
