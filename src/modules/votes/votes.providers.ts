import { Votes } from './votes.entity';
import { VOTES_REPOSITORY } from '../../core/constants';

export const votesProviders = [
  {
    provide: VOTES_REPOSITORY,
    useValue: Votes,
  },
];
