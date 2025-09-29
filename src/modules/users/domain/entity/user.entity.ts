import { AggregateRoot } from '@nestjs/cqrs';
import { UserCreatedEvent } from '../events/user-created.event';
import { UserUpdatedEvent } from '../events/user-updated.event';
import { UserDeletedEvent } from '../events/user-deleted.event';
import { UserContact, UserRole } from './user-data-types';

export class SupplierDetails {
  public businessName: string;
  public businessType: string;
  public taxId: string;
  public establishedYear: string;
  public numberOfEmployees: string;
  public website: string;

  public contactPersonName: string;
  public contactEmail: string;
  public contactPhone: string;
  public street: string;
  public building: string;
  public city: string;
  public country: string;

  public businessDescription: string;
  public specializations: string[];

  public licenseType: string;
  public licenseNumber: string;
  public uploadedFiles: string[];
}

export class User extends AggregateRoot {
  private id: string;
  private email: string;
  private name: string;
  private passwordHash: string;
  private contact: UserContact | null;
  private role: UserRole;
  private supplierDetails: SupplierDetails | null;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(
    id: string,
    email: string,
    name: string,
    passwordHash: string,
    contact: UserContact | null,
    role: UserRole = UserRole.USER,
    supplierDetails: SupplierDetails | null = null,
  ) {
    super();
    this.id = id;
    this.email = email;
    this.name = name;
    this.role = role ? role : UserRole.USER;
    this.passwordHash = passwordHash;
    this.contact = contact;
    this.supplierDetails = supplierDetails;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  public getId(): string {
    return this.id;
  }
  public getEmail(): string {
    return this.email;
  }
  public getName(): string {
    return this.name;
  }
  public getPasswordHash(): string {
    return this.passwordHash;
  }
  public getContact(): UserContact | null {
    return this.contact;
  }
  public getRole(): UserRole | null {
    return this.role;
  }
  public getCreatedAt(): Date {
    return this.createdAt;
  }
  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public getSupplierDetails(): SupplierDetails | null {
    return this.supplierDetails;
  }

  public static create(
    id: string,
    email: string,
    name: string,
    passwordHash: string,
    contact: UserContact | null,
    role: UserRole = UserRole.USER,
  ): User {
    const user = new User(id, email, name, passwordHash, contact, role);
    user.apply(new UserCreatedEvent(user));
    return user;
  }

  public update(
    email: string,
    name: string,
    passwordHash: string,
    contact: UserContact | null,
    role: UserRole | null,
  ): void {
    this.email = email;
    this.name = name;
    this.role = role ? role : this.role; // If role is null, keep the current role
    this.passwordHash = passwordHash;
    this.contact = contact;
    this.updatedAt = new Date();
    this.apply(new UserUpdatedEvent(this));
  }

  public delete(): void {
    this.apply(new UserDeletedEvent(this));
  }
}
