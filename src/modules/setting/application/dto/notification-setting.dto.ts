import { IsNotEmpty } from "class-validator";

export class NotificationSettingDto {
    @IsNotEmpty()
    orderConfirmation: boolean;

    @IsNotEmpty()
    shippingUpdates: boolean;

    @IsNotEmpty()
    promotional: boolean;

    @IsNotEmpty()
    lowStockAlerts: boolean;
}