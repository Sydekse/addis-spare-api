import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export enum FilterTypeEnum {
  RANGE = 'range',
  LIKE = 'like',
  EQ = 'eq',
}

class RangeValue {
  @IsNotEmpty()
  min: any;

  @IsNotEmpty()
  max: any;
}

export class Filter {
  @IsString()
  field: string;

  @IsEnum(FilterTypeEnum)
  type: FilterTypeEnum;

  @IsOptional()
  @ValidateNested()
  @Type(() => RangeValue)
  range?: RangeValue;

  @IsOptional()
  eq?: any;

  @IsOptional()
  like?: any;
}

export enum ReportTypeEnum {
  INVENTORY = 'INVENTORY',
  PRODUCT = 'PRODUCT',
  ORDER = 'ORDER',
}

export class CreateReportDto {
  @IsNotEmpty()
  @IsEnum(ReportTypeEnum)
  type: ReportTypeEnum;

  @ValidateNested({ each: true })
  @Type(() => Filter)
  filters: Filter[];

  @IsNotEmpty()
  @IsString()
  outputLocation: string;
}
