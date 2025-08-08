import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationController } from './interfaces/http/controllers/notification.controller';
import { CreateNotificationUseCase } from './application/use-cases/create/create-notification.use-case';
import { NotificationTypeOrmEntity } from './infrastructure/persistence/typeorm/notification-type-orm.entity';
import { NotificationTypeormRepository } from './infrastructure/persistence/repositories/notification-typeorm.repository';
import { NOTIFICATION_REPOSITORY } from './domain/repositories/notification.repository';
import { UpdateNotificationUseCase } from './application/use-cases/update/update-notification.use-case';
import { FindNotificationByIdUseCase } from './application/use-cases/find/find-notification-by-id.use-case';
import { FindAllNotificationsUseCase } from './application/use-cases/find/find-all-notification.use-case';
import { DeleteNotificationUseCase } from './application/use-cases/delete/delete-notification.use-case';
import { UserModule } from '../users/user.module';
import { FindInAppNotificationsUseCase } from './application/use-cases/find/find-in-app-notification.use-case';
import { SendNotificationUseCase } from './application/use-cases/update/send-notification.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationTypeOrmEntity]), UserModule],
  controllers: [NotificationController],
  providers: [
    CreateNotificationUseCase,
    SendNotificationUseCase,
    UpdateNotificationUseCase,
    FindNotificationByIdUseCase,
    FindAllNotificationsUseCase,
    FindInAppNotificationsUseCase,
    DeleteNotificationUseCase,
    {
      provide: NOTIFICATION_REPOSITORY,
      useClass: NotificationTypeormRepository,
    },
  ],
  exports: [NOTIFICATION_REPOSITORY],
})
export class NotificationModule {}
