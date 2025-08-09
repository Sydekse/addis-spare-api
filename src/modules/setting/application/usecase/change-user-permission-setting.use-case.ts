import { Inject, Injectable } from '@nestjs/common';
import {
  SETTINGS_REPOSITORY,
  SettingsRepository,
} from '../../domain/repositories/settings.repository';
import { UserPermissionSettingUpdateDto } from '../dto/user-permission-setting-update.dto';

@Injectable()
export class ChangeUserPermissionSettingUseCase {
  constructor(
    @Inject(SETTINGS_REPOSITORY)
    private readonly userRepository: SettingsRepository,
  ) {}

  async execute(setting: UserPermissionSettingUpdateDto): Promise<void> {
    await this.userRepository.updateUserPermissions(
      setting.userId,
      setting.userPermissions.role,
    );
  }
}
