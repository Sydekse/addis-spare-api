import { UserRole } from 'src/modules/users/domain/entity/user-data-types';

export enum TaxType {
  VAT = 'vat',
  SALES = 'sales',
  IMPORT = 'import',
}

export interface TaxRule {
  region: string;
  taxRate: number;
  taxType: TaxType;
  isActive: boolean;
}

export interface DeliveryZone {
  zoneId: string;
  zoneName: string;
  deliveryFee: number;
  estimatedDeliveryDays: number;
  supportedAreas: string[];
}

export interface UserPermission {
  role: UserRole;
  permissions: {
    canManageProducts: boolean;
    canProcessOrders: boolean;
    canManageUsers: boolean;
    canConfigureSystem: boolean;
  };
}

export interface CurrencySettings {
  primaryCurrency: 'ETB';
  secondaryCurrency: 'USD' | null;
  exchangeRate: number | null;
  exchangeRateUpdatedAt: Date | null;
}

export interface NotificationSettings {
  orderConfirmation: boolean;
  shippingUpdates: boolean;
  promotional: boolean;
  lowStockAlerts: boolean;
}
