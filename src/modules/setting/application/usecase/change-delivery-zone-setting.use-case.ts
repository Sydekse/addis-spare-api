import { Inject, Injectable } from '@nestjs/common';
import {
  SETTINGS_REPOSITORY,
  SettingsRepository,
} from '../../domain/repositories/settings.repository';
import { DeliveryZone } from '../../domain/entities/setting-data-types';
import { DeliveryZoneUpdateDto } from '../dto/delivery-zone-update.dto';

@Injectable()
export class ChangeDeliveryZoneSettingUseCase {
  constructor(
    @Inject(SETTINGS_REPOSITORY)
    private readonly settingsRepository: SettingsRepository,
  ) {}

  async execute(setting: DeliveryZoneUpdateDto): Promise<void> {
    await this.settingsRepository.updateDeliveryZones(
      setting.userId,
      setting.deliveryZone,
    );
  }
}
