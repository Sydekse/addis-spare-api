import {
  IsString,
  IsNumber,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  MinLength,
  Matches,
  MaxLength,
  IsOptional,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(30)
  @Matches(/^[a-zA-Z0-9-]+$/, {
    message: 'SKU must be alphanumeric and may include dashes only.',
  })
  sku: string;

  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsArray()
  @IsString({ each: true })
  images: string[];

  @IsArray()
  @IsString({ each: true })
  attributes: string[];

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  tags: string[];

  @IsBoolean()
  @IsNotEmpty()
  stockControlled: boolean;
}
