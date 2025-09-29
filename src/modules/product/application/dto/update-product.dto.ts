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
  ValidateNested,
  IsObject,
} from 'class-validator';

class CompatibilityData {
  @IsString()
  @IsNotEmpty()
  make: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsNumber()
  @IsNotEmpty()
  year: number;
}

export class UpdateProductDto {
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

  @IsOptional()
  @IsObject()
  attributes: Record<string, any>;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  tags: string[];

  @IsBoolean()
  @IsNotEmpty()
  stockControlled: boolean;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  compatibility: CompatibilityData[];
}
