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

  // @UseGuards(AuthGuard('jwt'))
  // @Post(':id')
  // async create(@Param('id') id: number, @Request() req): Promise<VotesEntity> {
  //   console.log("Here");
  //   return await this.votesService.create(id, req.user.id);
  // }
}


  // @Put('vote/:id')
  // async increment(@Param('id') id: number): Promise<ProposalEntity> {
  //   // find the post with this id and increment vote
  //   const post = await this.proposalService.increment(id);
  //   // if the post doesn't exit in the db, throw a 404 error
  //   if (!post) {
  //     throw new NotFoundException('This Post doesn\'t exist');
  //   }
  //   // if post exist, return the post
  //   return post;
  // }
