import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateSettingDto } from 'src/modules/setting/application/dto/create-settings.dto';
import { CurrencySettingsDto } from 'src/modules/setting/application/dto/currency-setting.dto';
import { DeliveryZoneUpdateDto } from 'src/modules/setting/application/dto/delivery-zone-update.dto';
import { DeliveryZoneDto } from 'src/modules/setting/application/dto/delivery-zone.dto';
import { ChangeNotificationDto } from 'src/modules/setting/application/dto/notification-setting-updated.dto';
import { UpdateCurrencySettingsDto } from 'src/modules/setting/application/dto/update-currency-setting.dto';
import { UpdateTaxSettingsDto } from 'src/modules/setting/application/dto/update-tax-settins.dto';
import { UserPermissionSettingUpdateDto } from 'src/modules/setting/application/dto/user-permission-setting-update.dto';
import { ChangeCurrencySettingUseCase } from 'src/modules/setting/application/usecase/change-currency-setting.use-case';
import { ChangeDeliveryZoneSettingUseCase } from 'src/modules/setting/application/usecase/change-delivery-zone-setting.use-case';
import { ChangeNotificationSettingUseCase } from 'src/modules/setting/application/usecase/change-notification-setting.use-case';
import { ChangeTaxSettingsUsecase } from 'src/modules/setting/application/usecase/change-tax-settings.user-case';
import { ChangeUserPermissionSettingUseCase } from 'src/modules/setting/application/usecase/change-user-permission-setting.use-case';
import { User } from 'src/modules/users/domain/entity/user.entity';

@Controller('settings')
export class SettingsController {
  constructor(
    private readonly createSettings: ChangeCurrencySettingUseCase,
    private readonly changeCurrencySettings: ChangeCurrencySettingUseCase,
    private readonly changeDeliveryZones: ChangeDeliveryZoneSettingUseCase,
    private readonly changeNotificationSettings: ChangeNotificationSettingUseCase,
    private readonly changeUserPermissions: ChangeUserPermissionSettingUseCase,
    private readonly changeTaxRules: ChangeTaxSettingsUsecase,
  ) {}

  @Post('create')
  async updateSettings(@Body() dto: CreateSettingDto): Promise<void> {
    return await this.createSettings.execute(dto);
  }

  @Post('update-permissions')
  async updateUserPermissions(dto: UserPermissionSettingUpdateDto) {
    return await this.changeUserPermissions.execute(dto);
  }
  @Post('update-notification')
  async updateNotificationSettings(dto: ChangeNotificationDto) {
    return await this.changeNotificationSettings.execute(dto);
  }
  @Post('update-currency')
  async updateCurrencySettings(dto: UpdateCurrencySettingsDto) {
    return await this.changeCurrencySettings.execute(dto);
  }

  @Post('update-delivery-zones')
  async updateDeliveryZones(dto: DeliveryZoneUpdateDto) {}

  @Post('update-tax')
  async updateTax(dto: UpdateTaxSettingsDto) {
    return await this.changeTaxRules.execute(dto);
  }
}
