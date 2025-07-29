import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationController } from './interfaces/http/controllers/notification.controller';
import { CreateNotificationUseCase } from './application/use-cases/create-module/create-notification.use-case';
import { NotificationTypeOrmEntity } from './infrastructure/persistence/typeorm/notification-type-orm.entity';
import { NotificationTypeormRepository } from './infrastructure/persistence/repositories/notification-typeorm.repository';
import { NOTIFICATION_REPOSITORY } from './domain/repositories/notification.repository';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationTypeOrmEntity])],
  controllers: [NotificationController],
  providers: [
    CreateNotificationUseCase,
    {
      provide: NOTIFICATION_REPOSITORY,
      useClass: NotificationTypeormRepository,
    },
  ],
  exports: [NOTIFICATION_REPOSITORY],
})
export class NotificationModule {}
