import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import {
  REPORT_REPOSITORY,
  ReportRepository,
} from 'src/modules/report/domain/repositories/report.repository';
import { CreateReportDto } from '../../dto/create-report.dto';
import { Report } from 'src/modules/report/domain/entities/report.entity';
import {
  USER_REPOSITORY,
  UserRepository,
} from 'src/modules/users/domain/repository/user.repository';

@Injectable()
export class CreateReportUseCase {
  constructor(
    @Inject(REPORT_REPOSITORY)
    private readonly reportRepository: ReportRepository,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(userId: string, dto: CreateReportDto): Promise<Report> {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new ForbiddenException('resouce forbidden');

    const report = Report.create(
      uuidv4(),
      dto.type,
      dto.filters,
      userId,
      dto.outputLocation,
    );

    await this.reportRepository.save(report);
    return report;
  }
}
