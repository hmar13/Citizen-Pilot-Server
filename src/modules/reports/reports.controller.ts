import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  NotFoundException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ReportsService } from './reports.service';
import { Report as ReportEntity } from './reports.entity';
import { ReportsDto } from './dto/reports.dto';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get()
  async findAll() {
    return await this.reportsService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('user')
  async findAllByUser(@Request() req): Promise<ReportEntity> {
    const report = await this.reportsService.findAllByUser(req.user.id);

    if (!report) {
      throw new NotFoundException('This user has no reports');
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return report;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ReportEntity> {
    const report = await this.reportsService.findOne(id);

    if (!report) {
      throw new NotFoundException('This Report does not exist');
    }
    return report;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Body() report: ReportsDto,
    @Request() req,
  ): Promise<ReportEntity> {
    return await this.reportsService.create(report, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    const deleted = await this.reportsService.delete(id, req.user.id);

    if (deleted === 0) {
      throw new NotFoundException('This report does not exist');
    }
    return 'Successfully deleted';
  }
}
