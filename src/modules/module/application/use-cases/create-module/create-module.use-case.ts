import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Module } from '../../../domain/entities/module.entity';
import { ModuleRepository } from '../../../domain/repositories/module.repository';
import { CreateModuleDto } from '../../dto/create-module.dto';

@Injectable()
export class CreateModuleUseCase {
  constructor(private readonly moduleRepository: ModuleRepository) {}

  async execute(dto: CreateModuleDto): Promise<Module> {
    const module = Module.create(uuidv4(), dto.name, dto.description);

    await this.moduleRepository.save(module);
    return module;
  }
}
