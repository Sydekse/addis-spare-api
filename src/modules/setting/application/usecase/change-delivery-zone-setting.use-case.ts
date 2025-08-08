import { Injectable } from "@nestjs/common";
import { SettingsRepository } from "../../domain/repositories/settings.repository";
import { DeliveryZone } from "../../domain/entities/setting-data-types";
import { DeliveryZoneUpdateDto } from "../dto/delivery-zone-update.dto";

@Injectable()
export class ChangeDeliveryZoneSettingUseCase {
    constructor(
        private readonly settingsRepository: SettingsRepository, 
    ) {}

    async execute(setting : DeliveryZoneUpdateDto): Promise<void> {

        await this.settingsRepository.updateDeliveryZones(setting.userId, setting.deliveryZone);
    }
}