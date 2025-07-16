import { IsNotEmpty } from "class-validator";
import { TaxType } from "src/modules/setting/domain/entities/setting-data-types";

export class TaxRule {
    @IsNotEmpty()
    region: string; 

    @IsNotEmpty()
    taxRate: number;

    @IsNotEmpty()
    taxType: TaxType; 

    @IsNotEmpty()
    isActive: boolean;
}