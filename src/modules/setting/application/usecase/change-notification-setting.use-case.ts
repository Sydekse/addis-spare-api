import { Injectable } from '@nestjs/common';
import { SettingsRepository } from '../../domain/repositories/settings.repository';
import { ChangeNotificationDto } from '../dto/notification-setting-updated.dto';

@Injectable()
export class ChangeNotificationSettingUseCase {
  constructor(private readonly settingsRepository: SettingsRepository) {}

  async execute(settings: ChangeNotificationDto): Promise<void> {
    await this.settingsRepository.updateNotificationSettings(
      settings.userId,
      settings.notificationSetting,
    );
  }
}
