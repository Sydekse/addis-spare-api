import { Inject, Injectable } from '@nestjs/common';
import {
  SETTINGS_REPOSITORY,
  SettingsRepository,
} from '../../domain/repositories/settings.repository';
import { UpdateCurrencySettingsDto } from '../dto/update-currency-setting.dto';

@Injectable()
export class ChangeCurrencySettingUseCase {
  constructor(
    @Inject(SETTINGS_REPOSITORY)
    private readonly settingsRepository: SettingsRepository,
  ) {}

  async execute(setting: UpdateCurrencySettingsDto): Promise<void> {
    await this.settingsRepository.updateCurrencySettings(
      setting.userId,
      setting.currencySettings,
    );
  }
}
