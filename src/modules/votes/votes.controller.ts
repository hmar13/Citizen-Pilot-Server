import { Controller, Param, UseGuards, Request, Post, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { VotesService } from './votes.service';
import { Votes as VotesEntity } from './votes.entity';
// import { Proposal as ProposalEntity } from '../proposals/proposals.entity';

@Controller('votes')
export class VotesController {
  constructor(private readonly votesService: VotesService) { }

  @Get()
  async findAll() {
    // get all votes in the db
    return await this.votesService.findAll();
  }
}
