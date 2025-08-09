import { Injectable } from '@nestjs/common';
import { SettingsRepository } from '../../domain/repositories/settings.repository';
import { CurrencySettings } from '../../domain/entities/setting-data-types';
import { UpdateCurrencySettingsDto } from '../dto/update-currency-setting.dto';

@Injectable()
export class ChangeCurrencySettingUseCase {
  constructor(private readonly settingsRepository: SettingsRepository) {}

  async execute(setting: UpdateCurrencySettingsDto): Promise<void> {
    await this.settingsRepository.updateCurrencySettings(
      setting.userId,
      setting.currencySettings,
    );
  }
}
