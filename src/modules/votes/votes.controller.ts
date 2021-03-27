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
    return await this.votesService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('user')
  async remove(@Request() req) {
    return await this.votesService.findVotesById(req.user.id);
  }
}
