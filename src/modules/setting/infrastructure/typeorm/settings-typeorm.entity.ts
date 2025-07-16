import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TaxRule } from "../../application/dto/tax-rule.dto";
import { CurrencySettings, DeliveryZone, NotificationSettings, UserPermission } from "../../domain/entities/setting-data-types";
import { UserRole } from "src/modules/users/domain/entity/user-data-types";

@Entity('settings')

export class SettingsTypeOrmEntity {
   
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 100, unique: true })
    userId: string;

    @Column({ type: 'jsonb' })
    taxRules: TaxRule;

    @Column({ type: 'jsonb' })
    deliveryZones: DeliveryZone;

    @Column({ type: 'jsonb' })
    currencySettings: CurrencySettings;
    
    @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
    userPermissions: UserPermission;

    @Column({ type: 'jsonb' })
    notificationSettings: NotificationSettings;

}   