import { Inject, Injectable } from '@nestjs/common';
import {
  NOTIFICATION_REPOSITORY,
  NotificationRepository,
} from '../../../domain/repositories/notification.repository';
import { Notification } from '../../../domain/entities/notification.entity';

@Injectable()
export class FindAllNotificationsUseCase {
  constructor(
    @Inject(NOTIFICATION_REPOSITORY)
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async execute(): Promise<Notification[]> {
    return await this.notificationRepository.findAll();
  }
}
