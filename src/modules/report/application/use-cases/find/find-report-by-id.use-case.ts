import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  REPORT_REPOSITORY,
  ReportRepository,
} from 'src/modules/report/domain/repositories/report.repository';
import { Report } from 'src/modules/report/domain/entities/report.entity';

@Injectable()
export class FindReportByIdUseCase {
  constructor(
    @Inject(REPORT_REPOSITORY)
    private readonly reportRepository: ReportRepository,
  ) {}

  async execute(id: string): Promise<Report> {
    const report = await this.reportRepository.findById(id);
    if (!report) {
      throw new NotFoundException('report not found');
    }

    return report;
  }
}
