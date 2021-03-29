import { Proposal } from './proposals.entity';
import { PROPOSALS_REPOSITORY } from '../../core/constants';

export const proposalsProviders = [
  {
    provide: PROPOSALS_REPOSITORY,
    useValue: Proposal,
  },
];
