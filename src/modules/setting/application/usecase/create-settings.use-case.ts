import { Inject, Injectable } from '@nestjs/common';
import {
  SETTINGS_REPOSITORY,
  SettingsRepository,
} from '../../domain/repositories/settings.repository';
import { SystemSettings } from '../../domain/entities/settins.entity';
import { CreateSettingDto } from '../dto/create-settings.dto';

@Injectable()
export class CreateSettingsUsecase {
  constructor(
    @Inject(SETTINGS_REPOSITORY)
    private readonly settingsRepository: SettingsRepository,
  ) {}

  async execute(settings: CreateSettingDto): Promise<SystemSettings> {
    const setting = SystemSettings.create(
      settings.id,
      settings.userId,
      settings.taxRules,
      settings.deliveryZones,
      settings.userPermissions,
      settings.currencySettings,
      settings.notificationSettings,
    );
    await this.settingsRepository.save(setting);
    return setting;
  }
}
