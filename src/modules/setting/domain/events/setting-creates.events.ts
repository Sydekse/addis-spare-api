import { SystemSettings } from '../entities/settins.entity';

export class SettingCreatedEvent {
  constructor(public systemSettings: SystemSettings) {}
}
