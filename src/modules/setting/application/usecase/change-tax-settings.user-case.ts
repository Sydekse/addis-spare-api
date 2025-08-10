import { Inject, Injectable } from '@nestjs/common';
import {
  SETTINGS_REPOSITORY,
  SettingsRepository,
} from '../../domain/repositories/settings.repository';
import { UpdateTaxSettingsDto } from '../dto/update-tax-settins.dto';

@Injectable()
export class ChangeTaxSettingsUsecase {
  constructor(
    @Inject(SETTINGS_REPOSITORY)
    private readonly userRepository: SettingsRepository,
  ) {}

  async execute(settings: UpdateTaxSettingsDto): Promise<void> {
    await this.userRepository.updateTax(settings.userId, settings.taxRule);
  }
}
