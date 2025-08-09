import { SystemSettings } from 'src/modules/setting/domain/entities/settins.entity';

export class SettingNotificationSettingsUpdatedEvent {
  constructor(public systemSettings: SystemSettings) {}
}
