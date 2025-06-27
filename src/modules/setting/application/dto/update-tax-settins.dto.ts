import { Type } from "class-transformer";
import { IsNotEmpty, ValidateNested } from "class-validator";
import { TaxRule } from "./tax-rule.dto";

export class UpdateTaxSettings {
    @IsNotEmpty()
    userId: string;
    @ValidateNested()
    @Type(() => TaxRule)
    taxRule: TaxRule;
}