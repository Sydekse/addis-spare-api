import {
  CurrencySettings,
  DeliveryZone,
  NotificationSettings,
} from '../entities/setting-data-types';
import { SystemSettings } from '../entities/settins.entity';
import { TaxRule } from '../../application/dto/tax-rule.dto';
import { UserRole } from 'src/modules/users/domain/entity/user-data-types';

export const SETTINGS_REPOSITORY = Symbol.for('SettingsRepository');

export interface SettingsRepository {
  findByUserId(userId: string): Promise<SystemSettings | null>;
  findById(id: string): Promise<SystemSettings | null>;
  save(settings: SystemSettings): Promise<void>;
  updateTax(id: string, taxRule: TaxRule): Promise<void>;
  updateDeliveryZones(id: string, deliveryZone: DeliveryZone): Promise<void>;
  updateUserPermissions(id: string, permissions: UserRole): Promise<void>;
  updateCurrencySettings(
    id: string,
    currencySettings: CurrencySettings,
  ): Promise<void>;
  find(): Promise<SystemSettings[]>
  updateNotificationSettings(
    id: string,
    notificationSettings: NotificationSettings,
  ): Promise<void>;
}
