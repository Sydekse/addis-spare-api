import { AggregateRoot } from '@nestjs/cqrs';
import { ReportUpdatedEvent } from '../events/report-updated.event';
import { ReportCreatedEvent } from '../events/report-created.event';
import {
  Filter,
  ReportTypeEnum,
} from '../../application/dto/create-report.dto';

export class Report extends AggregateRoot {
  private id: string;
  private type: ReportTypeEnum;
  private parameters: Filter[];
  private generatedBy: string;
  private generatedAt: Date;
  private outputLocation: string;

  constructor(
    id: string,
    type: ReportTypeEnum,
    parameters: Filter[],
    generatedBy: string,
    outputLocation: string,
  ) {
    super();
    this.id = id;
    this.type = type;
    this.parameters = parameters;
    this.generatedBy = generatedBy;
    this.outputLocation = outputLocation;
    this.generatedAt = new Date();
  }

  public getId(): string {
    return this.id;
  }

  public getType(): ReportTypeEnum {
    return this.type;
  }

  public getParameters(): Filter[] {
    return this.parameters;
  }

  public getGeneratedBy(): string {
    return this.generatedBy;
  }

  public getGeneratedAt(): Date {
    return this.generatedAt;
  }

  public getOutputLocation(): string {
    return this.outputLocation;
  }

  public update(
    type: ReportTypeEnum,
    parameters: Filter[],
    outputLocation: string,
  ): void {
    this.type = type;
    this.parameters = parameters;
    this.outputLocation = outputLocation;
    this.apply(new ReportUpdatedEvent(this));
  }

  public static create(
    id: string,
    type: ReportTypeEnum,
    parameters: Filter[],
    generatedBy: string,
    outputLocation: string,
  ): Report {
    const report = new Report(
      id,
      type,
      parameters,
      generatedBy,
      outputLocation,
    );
    report.apply(new ReportCreatedEvent(report));
    return report;
  }
}
