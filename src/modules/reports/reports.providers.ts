import { Report } from './reports.entity';
import { REPORTS_REPOSITORY } from '../../core/constants';

export const reportsProviders = [
  {
    provide: REPORTS_REPOSITORY,
    useValue: Report,
  },
];
