import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum NotificationStatus {
  PENDING = 'PENDING',
  FAILED = 'FAILED',
  SENT = 'SENT',
}

export enum NotificationChannel {
  SMS = 'SMS',
  GMAIL = 'GMAIL',
  IN_APP = 'IN-APP',
}

class NotificationRelatedToDto {
  @IsNotEmpty()
  @IsString()
  entity: string;

  @IsNotEmpty()
  @IsString()
  id: string;
}

export class CreateNotificationDto {
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsEnum(NotificationChannel)
  channel: NotificationChannel;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  subject: string;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsEnum(NotificationStatus)
  status: NotificationStatus;

  @IsOptional()
  @ValidateNested()
  @Type(() => NotificationRelatedToDto)
  relatedTo?: NotificationRelatedToDto;
}
