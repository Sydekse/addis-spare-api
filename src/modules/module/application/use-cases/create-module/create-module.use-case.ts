import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Module } from '../../../domain/entities/module.entity';
import {
  MODULE_REPOSITORY,
  ModuleRepository,
} from '../../../domain/repositories/module.repository';
import { CreateModuleDto } from '../../dto/create-module.dto';

@Injectable()
export class CreateModuleUseCase {
  constructor(
    @Inject(MODULE_REPOSITORY)
    private readonly moduleRepository: ModuleRepository,
  ) {}

  async execute(dto: CreateModuleDto): Promise<Module> {
    const module = Module.create(uuidv4(), dto.name, dto.description);

    await this.moduleRepository.save(module);
    return module;
  }
}
