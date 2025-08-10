import { SystemSettings } from 'src/modules/setting/domain/entities/settins.entity';

export class SettingCurrencySettingsUpdatedEvent {
  constructor(public systemSettings: SystemSettings) {}
}
