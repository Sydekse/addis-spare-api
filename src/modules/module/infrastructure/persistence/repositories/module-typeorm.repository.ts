import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Module } from '../../../domain/entities/module.entity';
import { ModuleRepository } from '../../../domain/repositories/module.repository';
import { ModuleTypeOrmEntity } from '../typeorm/module-typeorm.entity';

@Injectable()
export class ModuleTypeOrmRepository implements ModuleRepository {
  constructor(
    @InjectRepository(ModuleTypeOrmEntity)
    private readonly repository: Repository<ModuleTypeOrmEntity>,
  ) {}

  async findById(id: string): Promise<Module | null> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) return null;

    return new Module(entity.id, entity.name, entity.description);
  }

  async findAll(): Promise<Module[]> {
    const entities = await this.repository.find();
    return entities.map(
      (entity) => new Module(entity.id, entity.name, entity.description),
    );
  }

  async save(module: Module): Promise<void> {
    const entity = new ModuleTypeOrmEntity();
    entity.id = module.getId();
    entity.name = module.getName();
    entity.description = module.getDescription();
    entity.createdAt = module.getCreatedAt();
    entity.updatedAt = module.getUpdatedAt();

    await this.repository.save(entity);
  }

  async update(module: Module): Promise<void> {
    const entity = await this.repository.findOne({
      where: { id: module.getId() },
    });
    if (!entity) throw new Error('Module not found');

    entity.name = module.getName();
    entity.description = module.getDescription();
    entity.updatedAt = module.getUpdatedAt();

    await this.repository.save(entity);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
