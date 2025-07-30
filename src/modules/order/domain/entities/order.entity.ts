import { AggregateRoot } from '@nestjs/cqrs';

export class Order extends AggregateRoot {
    private id: string;
    private userId: string;
    private items: any[];
    private createdAt: Date;

    constructor(id: string, userId: string, items: any[], createdAt: Date) {
        super();
        this.id = id;
        this.userId = userId;
        this.items = items;
        this.createdAt = createdAt;
    }

    public getId(): string {
        return this.id;
    }

    public getUserId(): string {
        return this.userId;
    }

    public getItems(): any[] {
        return this.items;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }


    public static create(id: string, userId: string, items: any[], createdAt: Date, updatedAt: Date): Order {
        const order = new Order(id, userId, items, createdAt);
        return order;
    }

    // Additional methods for domain logic can be added here
}