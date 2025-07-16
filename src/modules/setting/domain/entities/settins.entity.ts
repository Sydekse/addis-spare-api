import { AggregateRoot } from "@nestjs/cqrs";
import { CurrencySettings, DeliveryZone, NotificationSettings, TaxRule, UserPermission } from "./setting-data-types";

export class SystemSettings extends AggregateRoot {
  private id: string;
  private userId: string;
  private taxRules: TaxRule; 
  private deliveryZones: DeliveryZone; 
  private userPermissions: UserPermission; 
  private currencySettings: CurrencySettings; 
  private notificationSettings: NotificationSettings; 
  private createdAt: Date;
  private updatedAt: Date;

  constructor(
    id: string,
    userId: string,
    taxRules: TaxRule,
    deliveryZones: DeliveryZone,
    userPermissions: UserPermission,
    currencySettings: CurrencySettings,
    notificationSettings: NotificationSettings,
  ) {
    super();
    this.id = id;
    this.userId = userId;
    this.taxRules = taxRules;
    this.deliveryZones = deliveryZones;
    this.userPermissions = userPermissions;
    this.currencySettings = currencySettings;
    this.notificationSettings = notificationSettings;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }


    public getId(): string {
        return this.id;
    }
    public getUserId(): string {
        return this.userId;
    }
    public getTaxRules(): TaxRule {
        return this.taxRules;
    }
    
    public getDeliveryZones(): DeliveryZone {
        return this.deliveryZones;
    }

    public getUserPermissions(): UserPermission {
        return this.userPermissions;
    }
    public getCurrencySettings(): CurrencySettings {
        return this.currencySettings;
    }
    public getNotificationSettings(): NotificationSettings {
        return this.notificationSettings;
    }

    public static create(
        id: string,
        userId: string,
        taxRules: TaxRule,
        deliveryZones: DeliveryZone,
        userPermissions: UserPermission,
        currencySettings: CurrencySettings,
        notificationSettings: NotificationSettings,
    ): SystemSettings {
        return new SystemSettings(
            id,
            userId,
            taxRules,
            deliveryZones,
            userPermissions,
            currencySettings,
            notificationSettings
        );
    }

    public updateTaxRules(taxRules: TaxRule): void {
        this.taxRules = taxRules;
        this.updatedAt = new Date();
    }

    public updateDeliveryZones(deliveryZones: DeliveryZone): void {
        this.deliveryZones = deliveryZones;
        this.updatedAt = new Date();
    }

    public updateUserPermissions(userPermissions: UserPermission): void {
        this.userPermissions = userPermissions;
        this.updatedAt = new Date();
    }

    public updateCurrencySettings(currencySettings: CurrencySettings): void {
        this.currencySettings = currencySettings;
        this.updatedAt = new Date();
    }

    public updateNotificationSettings(notificationSettings: NotificationSettings): void {
        this.notificationSettings = notificationSettings;
        this.updatedAt = new Date();
    }


    
}