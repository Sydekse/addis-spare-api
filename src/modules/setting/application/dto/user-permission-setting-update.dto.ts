import { IsNotEmpty } from 'class-validator';
import { UserPermission } from 'src/modules/setting/domain/entities/setting-data-types';

export class UserPermissionSettingUpdateDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  userPermissions: UserPermission;
}
