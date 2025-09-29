import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { CurrencySettingsDto } from './currency-setting.dto';
import { CurrencySettings } from '../../domain/entities/setting-data-types';

export class UpdateCurrencySettingsDto {
  @IsNotEmpty()
  userId: string;

  @ValidateNested()
  @Type(() => CurrencySettingsDto)
  currencySettings: CurrencySettings;
}
