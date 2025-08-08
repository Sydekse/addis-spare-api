import { IsNotEmpty } from "class-validator";

export class CurrencySettingsDto {
    @IsNotEmpty()
    primaryCurrency: string;

    @IsNotEmpty()
    exchangeRate: number;
    

}
