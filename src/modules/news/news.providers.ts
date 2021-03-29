import { News } from './news.entity';
import { NEWS_REPOSITORY } from '../../core/constants';

export const newsProviders = [
  {
    provide: NEWS_REPOSITORY,
    useValue: News,
  },
];
