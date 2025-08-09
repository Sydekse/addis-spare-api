import { Injectable } from '@nestjs/common';
import { SettingsRepository } from '../../domain/repositories/settings.repository';
import { UserRole } from 'src/modules/users/domain/entity/user-data-types';
import { UserPermission } from '../../domain/entities/setting-data-types';
import { UserPermissionSettingUpdateDto } from '../dto/user-permission-setting-update.dto';

@Injectable()
export class ChangeUserPermissionSettingUseCase {
  constructor(private readonly userRepository: SettingsRepository) {}

  async execute(setting: UserPermissionSettingUpdateDto): Promise<void> {
    await this.userRepository.updateUserPermissions(
      setting.userId,
      setting.userPermissions,
    );
  }
}
