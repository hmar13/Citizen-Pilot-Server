import { Injectable, Inject } from '@nestjs/common';
import { Report } from './reports.entity';
import { ReportsDto } from './dto/reports.dto';
import { User } from '../users/user.entity';
import { REPORTS_REPOSITORY } from '../../core/constants';


@Injectable()
export class ReportsService {
  constructor(@Inject(REPORTS_REPOSITORY) private readonly reportRepository: typeof Report) { }

  async create(reports: ReportsDto, userId): Promise<Report> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return await this.reportRepository.create<Report>({ ...reports, userId })
  }

  async findAll(): Promise<Report[]> {
    return await this.reportRepository.findAll<Report>({
      include: [{ model: User, attributes: {exclude: ['password'] }}],
    });
  }

  async findOne(id): Promise<Report> {
    return await this.reportRepository.findOne({
      where: { id },
      include: [{ model: User, attributes: {exclude: ['password'] }}],
    });
  }

  async findAllByUser(userId): Promise<Report[]> {
    return await this.reportRepository.findAll({
      where: { userId: userId },
      include: [{ model: User, attributes: {exclude: ['password'] }}],
    });
  }

  async delete(id, userId) {
    return await this.reportRepository.destroy({ where: { id, userId }});
  }
}
