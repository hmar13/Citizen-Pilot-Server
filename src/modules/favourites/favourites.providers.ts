import { Favourite } from './favourites.entity';
import { FAVOURITES_REPOSITORY } from '../../core/constants';

export const favouritesProviders = [
  {
    provide: FAVOURITES_REPOSITORY,
    useValue: Favourite,
  },
];
