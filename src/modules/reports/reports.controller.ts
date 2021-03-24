import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  UseGuards,
  Request
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ReportsService } from './reports.service';
import { Report as ReportEntity } from './reports.entity';
import { ReportsDto } from './dto/reports.dto';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) { }

  @Get()
  async findAll() {
    //Get all reports in the DB
    return await this.reportsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ReportEntity> {
    // Find all reports with this id
    const report = await this.reportsService.findOne(id)

    // If the report id doesn't exist in the db, throw a 404 error
    if(!report) {
      throw new NotFoundException('This Report does not exist');
    }

    // If the report exists, return the report
    return report;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() report: ReportsDto, @Request() req): Promise<ReportEntity> {
    // create a new report and return the newly created report
    return await this.reportsService.create(report, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    // Delete the report with the id passed
    const deleted = await this.reportsService.delete(id, req.user.id);

    //If length is 0, report doesn't exist in the DB
    if (deleted === 0) {
      throw new NotFoundException('This report does not exist');
    }

    //Return sucessful deletion message
    return 'Successfully deleted';
  }
}
