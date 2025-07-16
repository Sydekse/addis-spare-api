import { Type } from "class-transformer";
import { IsNotEmpty, ValidateNested } from "class-validator";
import {  NotificationSettings } from 'src/modules/setting/domain/entities/setting-data-types';
import { NotificationSettingDto } from "./notification-setting.dto";

export class ChangeNotificationDto {
    @IsNotEmpty()
    userId: string;
    @ValidateNested()
    @Type(() => NotificationSettingDto)
    notificationSetting: NotificationSettings;
}