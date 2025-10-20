export interface UserContact {
  phone: string;
  address: string;
  country: string;
  city: string;
}

export enum UserRole {
  USER = 'customer',
  SUPPLIER = 'supplier',
  ADMIN = 'admin',
}

export interface SupplierDetails {
  businessName?: string;
  businessType?: string;
  taxId?: string;
  establishedYear?: string;
  numberOfEmployees?: string;
  website?: string;

  contactPersonName?: string;
  contactEmail?: string;
  contactPhone?: string;
  street?: string;
  building?: string;
  city?: string;
  country?: string;

  isVerified?: boolean;

  businessDescription?: string;
  specializations?: string[];

  licenseType?: string;
  licenseNumber?: string;
  uploadedFiles?: string[];
}
