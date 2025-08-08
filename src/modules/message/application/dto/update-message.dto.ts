import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateMessageDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(1000)
  body: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  attachments: string[] = [];
}
