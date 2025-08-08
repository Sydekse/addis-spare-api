import {
  IsDate,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  NotificationChannel,
  NotificationStatus,
} from './create-notification.dto';

class NotificationRelatedTo {
  @IsOptional()
  @IsString()
  entity?: string;

  @IsOptional()
  @IsString()
  id?: string;
}

export class UpdateNotificationDto {
  @IsOptional()
  @IsUUID()
  userId: string;

  @IsOptional()
  @IsEnum(NotificationChannel)
  channel: NotificationChannel;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  subject: string;

  @IsOptional()
  @IsString()
  message: string;

  @IsOptional()
  @IsEnum(NotificationStatus)
  status: NotificationStatus;

  @IsOptional()
  @ValidateNested()
  @Type(() => NotificationRelatedTo)
  relatedTo?: NotificationRelatedTo;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  sentAt: Date;
}
