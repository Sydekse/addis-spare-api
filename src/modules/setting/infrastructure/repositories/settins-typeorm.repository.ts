import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { SystemSettings } from "../../domain/entities/settins.entity";
import { SettingsTypeOrmEntity } from "../typeorm/settings-typeorm.entity";
import { CurrencySettings, DeliveryZone, NotificationSettings, TaxRule, UserPermission } from "src/modules/setting/domain/entities/setting-data-types";

@Injectable()
class SettingsTypeOrmRepository {
    constructor(private readonly repository: Repository<SettingsTypeOrmEntity>) {
        // Inject the TypeORM repository for settings
    }   

    async findByUserId(userId: string): Promise<SystemSettings | null> {
        const user = await this.repository.findOne({ where: { userId } });
        if (!user) return null;

        return new SystemSettings(
            user.id,
            user.userId,
            user.taxRules,
            user.deliveryZones,
            user.userPermissions,
            user.currencySettings,
            user.notificationSettings
        );
    }

    async findById(id: string): Promise<SystemSettings | null> {
        const setting = await this.repository.findOne({ where: { id } });

        if (!setting) return null;
        

        return new SystemSettings(
            setting.id, 
            setting.userId,
            setting.taxRules, 
            setting.deliveryZones, 
            setting.userPermissions, 
            setting.currencySettings, 
            setting.notificationSettings
        )
    }

    async save(settings: SystemSettings): Promise<void> {
        const userEntity = new SettingsTypeOrmEntity();
        userEntity.id = settings.getId();
        userEntity.userId = settings.getUserId();
        userEntity.taxRules = settings.getTaxRules();
        userEntity.deliveryZones = settings.getDeliveryZones();
        userEntity.userPermissions = settings.getUserPermissions();
        userEntity.currencySettings = settings.getCurrencySettings();
        userEntity.notificationSettings = settings.getNotificationSettings();
        await this.repository.save(userEntity);
    }

    async updateTax(id : string, taxRules: TaxRule): Promise<void> {
        await this.repository.update(id, { taxRules });
    }

    async updateDeliveryZones(id: string, deliveryZone: DeliveryZone): Promise<void> {
        await this.repository.update(id, { deliveryZones: deliveryZone });
    }

    async updateUserPermissions(id: string, permissions: UserPermission): Promise<void> {
        await this.repository.update(id, { userPermissions: permissions });
    }

    async updateCurrencySettings(id: string, currencySettings: CurrencySettings): Promise<void> {
        await this.repository.update(id, { currencySettings });
    }

    async updateNotificationSettings(id: string, notificationSettings: NotificationSettings): Promise<void> {
        await this.repository.update(id, { notificationSettings });
    }
}