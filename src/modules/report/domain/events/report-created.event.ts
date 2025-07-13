import { Report } from '../entities/report.entity';

export class ReportCreatedEvent {
  constructor(public readonly report: Report) {}
}
