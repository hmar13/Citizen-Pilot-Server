import { Injectable, Inject } from '@nestjs/common';
import { Proposal } from './proposals.entity';
import { ProposalDto } from './dto/proposal.dto';
import { User } from '../users/user.entity';
import { PROPOSALS_REPOSITORY } from '../../core/constants';

@Injectable()
export class ProposalsService {
  constructor(@Inject(PROPOSALS_REPOSITORY) private readonly proposalRepository: typeof Proposal) { }

  async create(proposal: ProposalDto, userId): Promise<Proposal> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return await this.proposalRepository.create<Proposal>({ ...proposal, userId });
  }

  async findAll(): Promise<Proposal[]> {
    return await this.proposalRepository.findAll<Proposal>({
      include: [{ model: User, attributes: { exclude: ['password'] } }],
    });
  }

  async findOne(id): Promise<Proposal> {
    return await this.proposalRepository.findOne({
      where: { id },
      include: [{ model: User, attributes: { exclude: ['password'] } }],
    });
  }

  async findAllApproved(): Promise<Proposal[]> {
    return await this.proposalRepository.findAll<Proposal>({
      where: { approved: true },
    });
  }

  async delete(id, userId) {
    return await this.proposalRepository.destroy({ where: { id, userId } });
  }

  async update(id, data, userId) {
    const [numberOfAffectedRows, [updatedPost]] = await this.proposalRepository.update({ ...data }, { where: { id, userId }, returning: true });

    return { numberOfAffectedRows, updatedPost };
  }
}