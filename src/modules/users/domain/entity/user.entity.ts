import { AggregateRoot } from '@nestjs/cqrs';
import { UserCreatedEvent } from '../events/user-created.event';
import { UserUpdatedEvent } from '../events/user-updated.event';
import { UserDeletedEvent } from '../events/user-deleted.event';
import { UserContact, UserRole, SupplierDetails } from './user-data-types';

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
  private isOnboarded: boolean;

  constructor(
    id: string,
    email: string,
    name: string,
    passwordHash: string,
    contact: UserContact | null,
    role: UserRole = UserRole.USER,
    isOnboarded: boolean,
    supplierDetails: SupplierDetails | null = null,
  ) {
    super();
    this.id = id;
    this.email = email;
    this.name = name;
    this.role = role ? role : UserRole.USER;
    this.passwordHash = passwordHash;
    this.contact = contact;
    this.isOnboarded = isOnboarded;
    this.supplierDetails = supplierDetails;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  public onboard() {
    this.isOnboarded = true;
    this.apply(new UserUpdatedEvent(this));
  }

  public getIsOnboarded(): boolean {
    return this.isOnboarded;
  }

  public fillSupplierDetails(supplierDetails: SupplierDetails): void {
    this.supplierDetails = supplierDetails;
    this.apply(new UserUpdatedEvent(this));
  }

  public getId(): string {
    return this.id;
  }

  public verifySupplier() {
    if (this.supplierDetails) {
      this.supplierDetails.isVerified = true;
    }
    this.apply(new UserUpdatedEvent(this));
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
    isOnboarded: boolean,
    supplierDetails: SupplierDetails | null = null,
  ): User {
    const user = new User(
      id,
      email,
      name,
      passwordHash,
      contact,
      role,
      isOnboarded,
      supplierDetails,
    );
    user.apply(new UserCreatedEvent(user));
    return user;
  }

  public update(
    email: string,
    name: string,
    passwordHash: string,
    contact: UserContact | null,
    role: UserRole | null,
    supplierDetails: SupplierDetails | null = null,
  ): void {
    this.email = email;
    this.name = name;
    this.role = role ? role : this.role; // If role is null, keep the current role
    this.passwordHash = passwordHash;
    this.contact = contact;
    if (supplierDetails !== undefined && supplierDetails !== null) {
      this.supplierDetails = supplierDetails;
    }
    this.updatedAt = new Date();
    this.apply(new UserUpdatedEvent(this));
  }

  public delete(): void {
    this.apply(new UserDeletedEvent(this));
  }
}
