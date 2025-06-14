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
  async findOne(@Param('id') id: string): Promise<Module> {
    // TODO: Implement findOne use case
    throw new Error('Not implemented');
  }

  @Get()
  async findAll(): Promise<Module[]> {
    // TODO: Implement findAll use case
    throw new Error('Not implemented');
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateModuleDto,
  ): Promise<Module> {
    // TODO: Implement update use case
    throw new Error('Not implemented');
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    // TODO: Implement delete use case
    throw new Error('Not implemented');
  }
}
