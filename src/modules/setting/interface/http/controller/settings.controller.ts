import { Controller, Post } from "@nestjs/common";
import { ChangeCurrencySettingUseCase } from "src/modules/setting/application/usecase/change-currency-setting.use-case";
import { ChangeDeliveryZoneSettingUseCase } from "src/modules/setting/application/usecase/change-delivery-zone-setting.use-case";
import { ChangeNotificationSettingUseCase } from "src/modules/setting/application/usecase/change-notification-setting.use-case";
import { ChangeTaxSettingsUsecase } from "src/modules/setting/application/usecase/change-tax-settings.user-case";
import { ChangeUserPermissionSettingUseCase } from "src/modules/setting/application/usecase/change-user-permission-setting.use-case";

@Controller('settings')
export class SettingsController {
    constructor(
        private readonly createSettings: ChangeCurrencySettingUseCase,
        private readonly changeCurrencySettings: ChangeCurrencySettingUseCase,
        private readonly changeDeliveryZones: ChangeDeliveryZoneSettingUseCase,
        private readonly changeNotificationSettings: ChangeNotificationSettingUseCase,
        private readonly changeUserPermissions: ChangeUserPermissionSettingUseCase,
        private readonly changeTaxRules: ChangeTaxSettingsUsecase,
    ) {
        
    }

    @Post('create')
    updateSettings() {
        return { message: "Settings updated successfully" };
    }

    @Post('update-permissions')
    updateUserPermissions() {

        return { message: "User permissions updated successfully" };
    }
    @Post('update-notification')
    updateNotificationSettings() {
        return { message: "Notification settings updated successfully" };
    }
    @Post('update-currency')
    updateCurrencySettings() {
        return { message: "Currency settings updated successfully" };
    }

    @Post('update-delivery-zones')
    updateDeliveryZones() {
        return { message: "Delivery zones updated successfully" };
    }

    @Post('update-tax')
    updateTax() {
        return { message: "Tax updated successfully" };
    }
    
}