import {
  IsString,
  IsInt,
  Min,
  IsOptional,
  IsNotEmpty,
  IsUUID,
} from 'class-validator';

export class UpdateOrderDto {
  @IsNotEmpty()
  @IsUUID()
  readonly productId: string;

  @IsString()
  @IsNotEmpty()
  readonly location: string;

  @IsInt()
  @Min(0)
  readonly quantity: number;

  @IsInt()
  @Min(0)
  readonly reorderThreshold: number;

  @IsOptional()
  @IsUUID()
  readonly supplierId?: string;
}
