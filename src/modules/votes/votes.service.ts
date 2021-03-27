import { Injectable, Inject } from '@nestjs/common';
import { Votes } from './votes.entity';
import { VOTES_REPOSITORY } from '../../core/constants';
// import { ProposalsService } from '../proposals/proposals.service';

@Injectable()
export class VotesService {
  constructor(@Inject(VOTES_REPOSITORY)private readonly votesRepository: typeof Votes) { }

  async findAll(): Promise<Votes[]> {
    return await this.votesRepository.findAll<Votes>({})
  }

  async create(proposalId, userId): Promise<Votes> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return await this.votesRepository.create<Votes>({ proposalId, userId })
  }

  async findVotesById(userId): Promise<Votes[]> {
    return await this.votesRepository.findAll<Votes>({
      where: { userId: userId },
    });
  }
}
