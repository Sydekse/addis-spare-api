import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Notification } from '../../../domain/entities/notification.entity';
import {
  NOTIFICATION_REPOSITORY,
  NotificationRepository,
} from '../../../domain/repositories/notification.repository';
import { CreateNotificationDto } from '../../dto/create-notification.dto';

@Injectable()
export class CreateNotificationUseCase {
  constructor(
    @Inject(NOTIFICATION_REPOSITORY)
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async execute(dto: CreateNotificationDto): Promise<Notification> {
    const notification = Notification.create(
      uuidv4(),
      dto.userId,
      dto.channel,
      dto.subject,
      dto.message,
      dto.status,
      dto.relatedTo,
    );

    await this.notificationRepository.save(notification);
    return notification;
  }
}
