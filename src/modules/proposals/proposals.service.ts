import { Injectable, Inject } from '@nestjs/common';
import { Proposal } from './proposals.entity';
import { ProposalDto } from './dto/proposal.dto';
import { User } from '../users/user.entity';
import { PROPOSALS_REPOSITORY } from '../../core/constants';
import { VotesService } from '../votes/votes.service';

@Injectable()
export class ProposalsService {
  constructor(
    @Inject(PROPOSALS_REPOSITORY)
    private readonly proposalRepository: typeof Proposal,
    private readonly votesService: VotesService,
  ) {}

  async create(proposal: ProposalDto, userId: number): Promise<Proposal> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return await this.proposalRepository.create({ ...proposal, userId });
  }

  async findAll(): Promise<Proposal[]> {
    return await this.proposalRepository.findAll<Proposal>({
      include: [{ model: User, attributes: { exclude: ['password'] } }],
    });
  }

  async findOne(id: number): Promise<Proposal> {
    return await this.proposalRepository.findOne<Proposal>({ where: { id } });
  }

  async increment(id: number, userId: number): Promise<Proposal> {
    try {
      await this.votesService.create(id, userId);
    } catch (error) {
      console.log('ERROR on increment: ', error);
    }
    return this.proposalRepository.increment('votes', { where: { id } });
  }

  async findAllApproved(): Promise<Proposal[]> {
    return await this.proposalRepository.findAll<Proposal>({
      where: { approved: true },
    });
  }

  async delete(id: number, userId: number) {
    return await this.proposalRepository.destroy({ where: { id, userId } });
  }

  async update(id: number, data, userId: number) {
    const [
      numberOfAffectedRows,
      [updatedPost],
    ] = await this.proposalRepository.update(
      { ...data },
      { where: { id, userId }, returning: true },
    );

    return { numberOfAffectedRows, updatedPost };
  }

  async approvedTrue(id: number) {
    const [
      numberOfAffectedRows,
      [updatedPost],
    ] = await this.proposalRepository.update(
      { approved: true },
      { where: { id }, returning: true },
    );

    return { numberOfAffectedRows, updatedPost };
  }

  async approvedFalse(id) {
    const [
      numberOfAffectedRows,
      [updatedPost],
    ] = await this.proposalRepository.update(
      { approved: false },
      { where: { id }, returning: true },
    );

    return { numberOfAffectedRows, updatedPost };
  }
}
