import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  @IsUUID()
  conversationId: string;

  @IsNotEmpty()
  @IsUUID()
  senderId: string;

  @IsNotEmpty()
  @IsUUID()
  recipientId: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(1000)
  body: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  attachments: string[] = [];
}
