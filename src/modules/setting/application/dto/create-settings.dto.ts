import { IsNotEmpty, ValidateNested } from 'class-validator';

import { Type } from 'class-transformer';
import { TaxRule } from './tax-rule.dto';
import { DeliveryZoneDto } from './delivery-zone.dto';
import {
  CurrencySettings,
  DeliveryZone,
  NotificationSettings,
  UserPermission,
} from '../../domain/entities/setting-data-types';
import { NotificationSettingDto } from './notification-setting.dto';
import { CurrencySettingsDto } from './currency-setting.dto';

export class CreateSettingDto {
  @IsNotEmpty()
  id: string;
  @IsNotEmpty()
  userId: string;

  @ValidateNested()
  @Type(() => TaxRule)
  taxRules: TaxRule;

  @IsNotEmpty()
  deliveryZones: DeliveryZone;

  @IsNotEmpty()
  userPermissions: UserPermission;

  @ValidateNested()
  @Type(() => DeliveryZoneDto)
  deliveryZone: DeliveryZone;

  @ValidateNested()
  @Type(() => CurrencySettingsDto)
  currencySettings: CurrencySettings;

  @ValidateNested()
  @Type(() => NotificationSettingDto)
  notificationSettings: NotificationSettings;
}
