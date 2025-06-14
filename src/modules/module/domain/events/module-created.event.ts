import { Module } from '../entities/module.entity';

export class ModuleCreatedEvent {
  constructor(public readonly module: Module) {}
}
