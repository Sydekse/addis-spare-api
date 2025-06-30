import { Module } from "@nestjs/common";
import e from "express";
import { SettingsController } from "./interface/http/controller/settings.controller";
import { ChangeCurrencySettingUseCase } from "./application/usecase/change-currency-setting.use-case";
import { ChangeDeliveryZoneSettingUseCase } from "./application/usecase/change-delivery-zone-setting.use-case";
import { ChangeNotificationSettingUseCase } from "./application/usecase/change-notification-setting.use-case";
import { ChangeTaxSettingsUsecase } from "./application/usecase/change-tax-settings.user-case";
import { ChangeUserPermissionSettingUseCase } from "./application/usecase/change-user-permission-setting.use-case";
import { CreateSettingsUsecase } from "./application/usecase/create-settings.use-case";
import { SettingsTypeOrmRepository } from "./infrastructure/repositories/settins-typeorm.repository";
import { SETTINGS_REPOSITORY } from "./domain/repositories/settings.repository";

@Module(
    {
        imports: [],
        controllers: [
            SettingsController
        ],
        providers: [
            ChangeCurrencySettingUseCase,
            ChangeDeliveryZoneSettingUseCase,
            ChangeNotificationSettingUseCase,
            ChangeTaxSettingsUsecase,
            ChangeUserPermissionSettingUseCase,
            CreateSettingsUsecase,
            {
                provide: SETTINGS_REPOSITORY,
                useClass: SettingsTypeOrmRepository
            }

        ],
        exports: [
            SETTINGS_REPOSITORY
            
        ]
    }
)

export class SettingsModule {}