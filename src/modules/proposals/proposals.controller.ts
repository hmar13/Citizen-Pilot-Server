import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProposalsService } from './proposals.service';
import { Proposal as ProposalEntity } from './proposals.entity';
import { ProposalDto } from './dto/proposal.dto';

@Controller('proposal')
export class ProposalsController {
  constructor(private readonly proposalService: ProposalsService) { }

  @Get()
  async findAll() {
    // get all posts in the db
    return await this.proposalService.findAll();
  }

  @Get('approved')
  async findAllApproved(): Promise<ProposalEntity[]> {
    // find the post with this id
    const post = await this.proposalService.findAllApproved();
    // if the post doesn't exit in the db, throw a 404 error
    if (!post) {
      throw new NotFoundException('This Post doesn\'t exist');
    }
    // if post exist, return the post
    return post;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() post: ProposalDto, @Request() req): Promise<ProposalEntity> {
    // create a new post and return the newly created post
    return await this.proposalService.create(post, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(@Param('id') id: number, @Body() post: ProposalDto, @Request() req): Promise<ProposalEntity> {
    // get the number of row affected and the updated post
    const { numberOfAffectedRows, updatedPost } = await this.proposalService.update(id, post, req.user.id);
    // if the number of row affected is zero,
    // it means the post doesn't exist in our db
    if (numberOfAffectedRows === 0) {
        throw new NotFoundException('This Post doesn\'t exist');
    }
    // return the updated post
    return updatedPost;
  }

  @Put('vote/:id')
  async increment(@Param('id') id: number): Promise<ProposalEntity> {
    // find the post with this id and increment vote
    const post = await this.proposalService.increment(id);
    // if the post doesn't exit in the db, throw a 404 error
    if (!post) {
      throw new NotFoundException('This Post doesn\'t exist');
    }
    // if post exist, return the post
    return post;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    // delete the post with this id
    const deleted = await this.proposalService.delete(id, req.user.id);
    // if the number of row affected is zero,
    // then the post doesn't exist in our db
    if (deleted === 0) {
        throw new NotFoundException('This Post doesn\'t exist');
    }
    // return success message
    return 'Successfully deleted';
  }
}