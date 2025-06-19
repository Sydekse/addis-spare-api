import { AggregateRoot } from '@nestjs/cqrs';
import { UserCreatedEvent } from '../events/user-created.event';
import { UserUpdatedEvent } from '../events/user-updated.event';
import { UserDeletedEvent } from '../events/user-deleted.event';

export class User extends AggregateRoot {
    private id: string
    private email: string
    private name: string 
    private phone: string
    private createdAt: Date 
    private updatedAt: Date

    constructor(id: string, email: string, name: string, phone: string) {
        super();
        this.id = id;
        this.email = email;
        this.name = name;
        this.phone = phone;
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
    public getPhone(): string {
        return this.phone;
    }       
    public getCreatedAt(): Date {
        return this.createdAt;
    }
    public getUpdatedAt(): Date {
        return this.updatedAt;
    }


    public static create(   id: string, email: string, name: string, phone: string): User {
        const user = new User(id, email, name, phone);
        user.apply(new UserCreatedEvent(user));
        return user;
    }


    public update(email: string, name: string, phone: string): void {
        this.email = email;
        this.name = name;
        this.phone = phone;
        this.updatedAt = new Date();
        this.apply(new UserUpdatedEvent(this));
    }

    public delete(): void {
        this.apply(new UserDeletedEvent(this));
    }
}