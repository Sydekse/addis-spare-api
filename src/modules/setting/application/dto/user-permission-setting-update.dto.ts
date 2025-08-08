import { Type } from "class-transformer";
import { IsNotEmpty, ValidateNested } from "class-validator";
import { DeliveryZone, UserPermission } from "src/modules/setting/domain/entities/setting-data-types";
import { DeliveryZoneDto } from "./delivery-zone.dto";
import { UserRole } from "src/modules/users/domain/entity/user-data-types";

export class UserPermissionSettingUpdateDto {
    @IsNotEmpty()
    userId: string;
     
    @IsNotEmpty()
    userPermissions: UserRole;
}