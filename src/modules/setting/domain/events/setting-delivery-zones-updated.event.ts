import { SystemSettings } from 'src/modules/setting/domain/entities/settins.entity';

export class SettingDeliveryZonesUpdatedEvent {
  constructor(public systemSettings: SystemSettings) {}
}
