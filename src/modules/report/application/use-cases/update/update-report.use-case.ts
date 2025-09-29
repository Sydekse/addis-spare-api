import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  REPORT_REPOSITORY,
  ReportRepository,
} from 'src/modules/report/domain/repositories/report.repository';
import { Report } from 'src/modules/report/domain/entities/report.entity';
import { UpdateReportDto } from '../../dto/update-report.dto';
import {
  USER_REPOSITORY,
  UserRepository,
} from 'src/modules/users/domain/repository/user.repository';

@Injectable()
export class UpdateReportUseCase {
  constructor(
    @Inject(REPORT_REPOSITORY)
    private readonly reportRepository: ReportRepository,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(
    userId: string,
    id: string,
    dto: UpdateReportDto,
  ): Promise<Report> {
    const report = await this.reportRepository.findById(id);
    if (!report) throw new NotFoundException('report not found');

    const user = await this.userRepository.findById(userId);
    if (!user || userId !== report.getGeneratedBy())
      throw new ForbiddenException('forbidden resource');

    report.update(dto.type, dto.filters, dto.outputLocation);

    await this.reportRepository.update(report);

    return report;
  }
}
