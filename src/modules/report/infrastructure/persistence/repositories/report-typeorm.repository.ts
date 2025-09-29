import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReportRepository } from 'src/modules/report/domain/repositories/report.repository';
import { ReportTypeOrmEntity } from '../typeorm/report-typeorm.entity';
import { Report } from 'src/modules/report/domain/entities/report.entity';

@Injectable()
export class ReportTypeOrmRepository implements ReportRepository {
  constructor(
    @InjectRepository(ReportTypeOrmEntity)
    private readonly repository: Repository<ReportTypeOrmEntity>,
  ) {}

  async findById(id: string): Promise<Report | null> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) return null;

    return new Report(
      entity.id,
      entity.type,
      entity.parameters,
      entity.generatedBy,
      entity.outputLocation,
    );
  }

  async findAll(): Promise<Report[]> {
    const entities = await this.repository.find();
    return entities.map(
      (entity) =>
        new Report(
          entity.id,
          entity.type,
          entity.parameters,
          entity.generatedBy,
          entity.outputLocation,
        ),
    );
  }

  async save(report: Report): Promise<void> {
    const entity = new ReportTypeOrmEntity();
    entity.id = report.getId();
    entity.type = report.getType();
    entity.parameters = report.getParameters();
    entity.generatedBy = report.getGeneratedBy();
    entity.outputLocation = report.getOutputLocation();
    entity.generatedAt = report.getGeneratedAt();

    await this.repository.save(entity);
  }

  async update(report: Report): Promise<void> {
    const entity = await this.repository.findOne({
      where: { id: report.getId() },
    });
    if (!entity) throw new Error('Report not found');

    entity.id = report.getId();
    entity.type = report.getType();
    entity.parameters = report.getParameters();
    entity.generatedBy = report.getGeneratedBy();
    entity.outputLocation = report.getOutputLocation();

    await this.repository.save(entity);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
