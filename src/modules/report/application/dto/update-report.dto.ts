import { IsEnum, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Filter, ReportTypeEnum } from './create-report.dto';
import { Type } from 'class-transformer';

export class UpdateReportDto {
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
