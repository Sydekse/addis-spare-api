import { AggregateRoot } from '@nestjs/cqrs';

export class PushNotificationSubscription extends AggregateRoot {
  id: string;
  userId: string;
  endpoint: string;
  p256dh: string;
  auth: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    userId: string,
    endpoint: string,
    p256dh: string,
    auth: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    super();
    this.id = id;
    this.userId = userId;
    this.endpoint = endpoint;
    this.p256dh = p256dh;
    this.auth = auth;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public static create(
    id: string,
    userId: string,
    endpoint: string,
    p256dh: string,
    auth: string,
    createdAt: Date,
    updatedAt: Date,
  ): PushNotificationSubscription {
    const subscription = new PushNotificationSubscription(
      id,
      userId,
      endpoint,
      p256dh,
      auth,
      createdAt,
      updatedAt,
    );
    return subscription;
  }

  public getId(): string {
    return this.id;
  }

  public getUserId(): string {
    return this.userId;
  }

  public getAuth(): string {
    return this.auth;
  }

  public getEndpoint(): string {
    return this.endpoint;
  }

  public getP256dh(): string {
    return this.p256dh;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public update(
    endpoint: string,
    p256dh: string,
    auth: string,
    createdAt: Date,
  ) {
    this.endpoint = endpoint;
    this.p256dh = p256dh;
    this.auth = auth;
    this.createdAt = createdAt;
    this.updatedAt = new Date();
  }
}
