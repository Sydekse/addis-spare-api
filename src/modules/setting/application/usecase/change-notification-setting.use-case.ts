import { Inject, Injectable } from '@nestjs/common';
import {
  SETTINGS_REPOSITORY,
  SettingsRepository,
} from '../../domain/repositories/settings.repository';
import { ChangeNotificationDto } from '../dto/notification-setting-updated.dto';

@Injectable()
export class ChangeNotificationSettingUseCase {
  constructor(
    @Inject(SETTINGS_REPOSITORY)
    private readonly settingsRepository: SettingsRepository,
  ) {}

  async execute(settings: ChangeNotificationDto): Promise<void> {
    await this.settingsRepository.updateNotificationSettings(
      settings.userId,
      settings.notificationSetting,
    );
  }
}
