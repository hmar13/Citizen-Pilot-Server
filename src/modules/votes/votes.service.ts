import { Injectable, Inject } from '@nestjs/common';
import { Votes } from './votes.entity';
import { VOTES_REPOSITORY } from '../../core/constants';

@Injectable()
export class VotesService {
  constructor(@Inject(VOTES_REPOSITORY) private readonly votesRepository: typeof Votes) { }
}
