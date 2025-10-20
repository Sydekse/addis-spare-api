/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CreateModuleUseCase } from '../../../application/use-cases/create-module/create-module.use-case';
import { CreateModuleDto } from '../../../application/dto/create-module.dto';
import { UpdateModuleDto } from '../../../application/dto/update-module.dto';
import { Module } from '../../../domain/entities/module.entity';

@Controller('modules')
export class ModuleController {
  constructor(private readonly createModuleUseCase: CreateModuleUseCase) {}

  @Post()
  async create(@Body() dto: CreateModuleDto): Promise<Module> {
    return this.createModuleUseCase.execute(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Module {
    // TODO: Implement findOne use case
    throw new Error('Not implemented');
  }

  @Get()
  findAll(): Module[] {
    // TODO: Implement findAll use case
    throw new Error('Not implemented');
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateModuleDto): Module {
    // TODO: Implement update use case
    throw new Error('Not implemented');
  }

  @Delete(':id')
  delete(@Param('id') id: string): void {
    // TODO: Implement delete use case
    throw new Error('Not implemented');
  }
}
