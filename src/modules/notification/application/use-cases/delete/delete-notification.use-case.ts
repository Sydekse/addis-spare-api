import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  NOTIFICATION_REPOSITORY,
  NotificationRepository,
} from '../../../domain/repositories/notification.repository';

@Injectable()
export class DeleteNotificationUseCase {
  constructor(
    @Inject(NOTIFICATION_REPOSITORY)
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const notification = await this.notificationRepository.findById(id);
    if (!notification) {
      throw new NotFoundException('notification is not found');
    }
    await this.notificationRepository.delete(id);
  }
}
