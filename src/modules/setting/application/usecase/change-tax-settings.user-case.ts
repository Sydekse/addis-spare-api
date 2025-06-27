import { Injectable } from "@nestjs/common";
import { SettingsRepository } from "../../domain/repositories/settings.repository";
import { UpdateTaxSettings } from "../dto/update-tax-settins.dto";

@Injectable()
export class ChangeTaxSettingsUsecase {
    constructor(private readonly userRepository: SettingsRepository) {}
    
    async execute(settings : UpdateTaxSettings): Promise<void> {
        await this.userRepository.updateTax(settings.userId, settings.taxRule);
    }
}