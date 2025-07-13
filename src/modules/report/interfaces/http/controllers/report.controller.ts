import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ValidationPipe,
  UsePipes,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CreateReportDto } from 'src/modules/report/application/dto/create-report.dto';
import { UpdateReportDto } from 'src/modules/report/application/dto/update-report.dto';
import { CreateReportUseCase } from 'src/modules/report/application/use-cases/create/create-report.use-case';
import { DeleteReportUseCase } from 'src/modules/report/application/use-cases/delete/delete-report.use-case';
import { AllReportsUseCase } from 'src/modules/report/application/use-cases/find/all-reports.use-case';
import { FindReportByIdUseCase } from 'src/modules/report/application/use-cases/find/find-report-by-id.use-case';
import { UpdateReportUseCase } from 'src/modules/report/application/use-cases/update/update-report.use-case';
import { Report } from 'src/modules/report/domain/entities/report.entity';
import { ReportPipe } from '../pipes/report.pipes';
import { JwtAuthGuard } from 'src/modules/auth/infrastructure/jwt/jwt.guard';
import { ACGuard } from 'nest-access-control';
import { v4 as uuidv4 } from 'uuid';

@Controller('reports')
@UseGuards(JwtAuthGuard, ACGuard)
export class ReportController {
  constructor(
    private readonly createReportUseCase: CreateReportUseCase,
    private readonly findAllReportsUseCase: AllReportsUseCase,
    private readonly updateReportUseCase: UpdateReportUseCase,
    private readonly deleteReportUseCase: DeleteReportUseCase,
    private readonly findReportByIdUseCase: FindReportByIdUseCase,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe(), new ReportPipe())
  async create(@Req() req, @Body() dto: CreateReportDto): Promise<Report> {
    const userId: string = req.user.id || uuidv4();
    return this.createReportUseCase.execute(userId, dto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Report> {
    return this.findReportByIdUseCase.execute(id);
  }

  @Get()
  async findAll(): Promise<Report[]> {
    return this.findAllReportsUseCase.execute();
  }

  @Put(':id')
  async update(
    @Req() req,
    @Param('id') id: string,
    @Body() dto: UpdateReportDto,
  ): Promise<Report> {
    const userId: string = req.user.id || uuidv4();

    return this.updateReportUseCase.execute(userId, id, dto);
  }

  @Delete(':id')
  async delete(@Req() req, @Param('id') id: string): Promise<void> {
    const userId: string = req.user.id || uuidv4();
    return this.deleteReportUseCase.execute(userId, id);
  }
}
