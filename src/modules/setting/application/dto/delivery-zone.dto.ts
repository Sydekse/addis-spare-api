import { IsNotEmpty } from 'class-validator';

export class DeliveryZoneDto {
  @IsNotEmpty()
  primaryCurrency: string;

  @IsNotEmpty()
  exchangeRate: number;

  @IsNotEmpty()
  exchangeRateUpdatedAt: Date;
}
