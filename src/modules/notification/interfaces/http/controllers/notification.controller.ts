import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateNotificationUseCase } from '../../../application/use-cases/create-module/create-notification.use-case';
import { CreateNotificationDto } from '../../../application/dto/create-notification.dto';
import { UpdateNotificationDto } from '../../../application/dto/update-notification.dto';
import { Notification } from '../../../domain/entities/notification.entity';
import { UpdateNotificationUseCase } from '../../../application/use-cases/create-module/update-notification.use-case';
import { DeleteNotificationUseCase } from '../../../application/use-cases/create-module/delete-notification.use-case';
import { FindNotificationByIdUseCase } from '../../../application/use-cases/create-module/find-notification-by-id.use-case';
import { FindAllNotificationsUseCase } from '../../../application/use-cases/create-module/find-all-notification.use-case';
import { FindInAppNotificationsUseCase } from 'src/modules/notification/application/use-cases/create-module/find-in-app-notification.use-case';
import { UseRoles } from 'nest-access-control';

@Controller('notifications')
export class NotificationController {
  constructor(
    private readonly createModuleUseCase: CreateNotificationUseCase,
    private readonly updateNotificationUseCase: UpdateNotificationUseCase,
    private readonly deleteNotificationUseCase: DeleteNotificationUseCase,
    private readonly findNotificationByIdUseCase: FindNotificationByIdUseCase,
    private readonly findAllNotificationsUseCase: FindAllNotificationsUseCase,
    private readonly findInAppNotificationForUserUseCase: FindInAppNotificationsUseCase,
  ) {}

  @Post()
  @UseRoles({
    resource: 'notification',
    action: 'create',
    possession: 'any',
  })
  async create(@Body() dto: CreateNotificationDto): Promise<Notification> {
    return this.createModuleUseCase.execute(dto);
  }

  @Get(':userId')
  @UseRoles({
    resource: 'notification',
    action: 'read',
    possession: 'own',
  })
  async getInApp(@Param('userId') userId: string) {
    return this.findInAppNotificationForUserUseCase.execute(userId);
  }

  @Get(':id')
  @UseRoles({
    resource: 'notification',
    action: 'read',
    possession: 'any',
  })
  async findOne(@Param('id') id: string): Promise<Notification> {
    return this.findNotificationByIdUseCase.execute(id);
  }

  @Get()
  @UseRoles({
    resource: 'notification',
    action: 'read',
    possession: 'any',
  })
  async findAll(): Promise<Notification[]> {
    return this.findAllNotificationsUseCase.execute();
  }

  @Put(':id')
  @UseRoles({
    resource: 'notification',
    action: 'update',
    possession: 'any',
  })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateNotificationDto,
  ): Promise<Notification | null> {
    return this.updateNotificationUseCase.execute(id, dto);
  }

  @Delete(':id')
  @UseRoles({
    resource: 'notification',
    action: 'delete',
    possession: 'any',
  })
  async delete(@Param('id') id: string): Promise<void> {
    return this.deleteNotificationUseCase.execute(id);
  }
}
