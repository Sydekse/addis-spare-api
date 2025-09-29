import { Report } from '../entities/report.entity';

export const REPORT_REPOSITORY = Symbol.for('ModuleRepository');
export interface ReportRepository {
  findById(id: string): Promise<Report | null>;
  findAll(): Promise<Report[]>;
  save(report: Report): Promise<void>;
  update(report: Report): Promise<void>;
  delete(id: string): Promise<void>;
}
