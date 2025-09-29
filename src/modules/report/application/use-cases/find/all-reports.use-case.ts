import { Inject, Injectable } from '@nestjs/common';
import {
  REPORT_REPOSITORY,
  ReportRepository,
} from 'src/modules/report/domain/repositories/report.repository';
import { Report } from 'src/modules/report/domain/entities/report.entity';

@Injectable()
export class AllReportsUseCase {
  constructor(
    @Inject(REPORT_REPOSITORY)
    private readonly reportRepository: ReportRepository,
  ) {}

  async execute(): Promise<Report[]> {
    return await this.reportRepository.findAll();
  }
}
