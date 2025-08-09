import { SystemSettings } from 'src/modules/setting/domain/entities/settins.entity';

export class SettingUserPermissionsUpdatedEvent {
  constructor(public systemSettings: SystemSettings) {}
}
