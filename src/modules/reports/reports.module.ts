import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { reportsProviders } from './reports.providers';

@Module({
  providers: [ReportsService, ...reportsProviders],
  controllers: [ReportsController],
})
export class ReportsModule {}
