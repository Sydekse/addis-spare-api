import { Type } from "class-transformer";
import { IsNotEmpty, ValidateNested } from "class-validator";
import { DeliveryZoneDto } from "./delivery-zone.dto";
import { DeliveryZone } from "../../domain/entities/setting-data-types";

export class DeliveryZoneUpdateDto {
    @IsNotEmpty()

    userId: string;
    @ValidateNested()
    @Type(() => DeliveryZoneDto)
    deliveryZone: DeliveryZone;
}