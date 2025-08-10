import { Module } from '../entities/module.entity';

export const MODULE_REPOSITORY = Symbol.for('ModuleRepository');
export interface ModuleRepository {
  findById(id: string): Promise<Module | null>;
  findAll(): Promise<Module[]>;
  save(module: Module): Promise<void>;
  update(module: Module): Promise<void>;
  delete(id: string): Promise<void>;
}
