import { AggregateRoot } from '@nestjs/cqrs';
import { ModuleCreatedEvent } from '../events/module-created.event';
import { ModuleUpdatedEvent } from '../events/module-updated.event';

export class Module extends AggregateRoot {
  private id: string;
  private name: string;
  private description: string;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(id: string, name: string, description: string) {
    super();
    this.id = id;
    this.name = name;
    this.description = description;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getDescription(): string {
    return this.description;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public update(name: string, description: string): void {
    this.name = name;
    this.description = description;
    this.updatedAt = new Date();
    this.apply(new ModuleUpdatedEvent(this));
  }

  public static create(id: string, name: string, description: string): Module {
    const module = new Module(id, name, description);
    module.apply(new ModuleCreatedEvent(module));
    return module;
  }
}
