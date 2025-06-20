import { AggregateRoot } from '@nestjs/cqrs';
import { UserCreatedEvent } from '../events/user-created.event';
import { UserUpdatedEvent } from '../events/user-updated.event';
import { UserDeletedEvent } from '../events/user-deleted.event';
import { UserContact, UserRole } from './user-data-types';

export class User extends AggregateRoot {
    private id: string
    private email: string
    private name: string 
    private passwordHash: string
    private contact: UserContact
    private role: UserRole = UserRole.USER // Default role
    private createdAt: Date 
    private updatedAt: Date

    constructor(id: string, email: string, name: string, passwordHash: string, contact: UserContact) {
        super();
        this.id = id;
        this.email = email;
        this.name = name;
        this.passwordHash = passwordHash;
        this.contact = contact;
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
    public getContact(): UserContact {
        return this.contact;
    }   
    public getCreatedAt(): Date {
        return this.createdAt;
    }
    public getUpdatedAt(): Date {
        return this.updatedAt;
    }


    public static create(   id: string, email: string, name: string, passwordHash: string, contact: UserContact): User {
        const user = new User(id, email, name, passwordHash, contact);
        user.apply(new UserCreatedEvent(user));
        return user;
    }


    public update(email: string, name: string, passwordHash: string, contact: UserContact): void {
        this.email = email;
        this.name = name;
        this.passwordHash = passwordHash;
        this.contact = contact;
        this.updatedAt = new Date();
        this.apply(new UserUpdatedEvent(this));
    }

    public delete(): void {
        this.apply(new UserDeletedEvent(this));
    }
}