export interface UserContact {
    phone: string;
    address: string;
    country: string;
    city: string;
}

export enum UserRole {
    USER = 'user',
    ADMIN = 'admin',
}