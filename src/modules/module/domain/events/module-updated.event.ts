import { Module } from '../entities/module.entity';

export class ModuleUpdatedEvent {
  constructor(public readonly module: Module) {}
}
