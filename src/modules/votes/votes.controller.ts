import { Controller, Param, UseGuards, Request, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { VotesService } from './votes.service';
import { Votes as VotesEntity } from './votes.entity';
import { Proposal as ProposalEntity } from '../proposals/proposals.entity';

@Controller('votes')
export class VotesController {
  // constructor(private readonly votesService: VotesService) { }

  // @UseGuards(AuthGuard('jwt'))
  // @Post(':id')
  // async create(@Param('id') id: number, @Request() req): Promise<ProposalEntity> {
  //   return await this.votesService.create(id, req.user.id);
  // }
}
