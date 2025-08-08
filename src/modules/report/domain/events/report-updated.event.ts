import { Report } from '../entities/report.entity';

export class ReportUpdatedEvent {
  constructor(public readonly report: Report) {}
}
