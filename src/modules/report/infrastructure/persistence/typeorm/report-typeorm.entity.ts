import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import {
  Filter,
  ReportTypeEnum,
} from 'src/modules/report/application/dto/create-report.dto';

@Entity('reports')
export class ReportTypeOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: ReportTypeEnum;

  @Column({ type: 'json' })
  parameters: Filter[];

  @Column()
  generatedBy: string;

  @Column({ type: 'timestamp' })
  generatedAt: Date;

  @Column({ nullable: true })
  outputLocation: string;
}
