import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProposalsService } from './proposals.service';
import { Proposal as ProposalEntity } from './proposals.entity';
import { ProposalDto } from './dto/proposal.dto';

@Controller('proposal')
export class ProposalsController {
  constructor(private readonly proposalService: ProposalsService) {}

  @Get()
  async findAll() {
    return await this.proposalService.findAll();
  }

  @Get('approved')
  async findAllApproved(): Promise<ProposalEntity[]> {
    const post = await this.proposalService.findAllApproved();
    if (!post) {
      throw new NotFoundException("This Post doesn't exist");
    }
    return post;
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ProposalEntity> {
    const post = await this.proposalService.findOne(id);
    if (!post) {
      throw new NotFoundException("This Post doesn't exist");
    }
    return post;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Body() post: ProposalDto,
    @Request() req,
  ): Promise<ProposalEntity> {
    return await this.proposalService.create(post, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('approved/true/:id')
  async approvedTrue(@Param('id') id: number): Promise<ProposalEntity> {
    const {
      numberOfAffectedRows,
      updatedPost,
    } = await this.proposalService.approvedTrue(id);

    if (numberOfAffectedRows === 0) {
      throw new NotFoundException("This Post doesn't exist");
    }
    return updatedPost;
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('approved/false/:id')
  async approvedFalse(@Param('id') id: number): Promise<ProposalEntity> {
    const {
      numberOfAffectedRows,
      updatedPost,
    } = await this.proposalService.approvedFalse(id);

    if (numberOfAffectedRows === 0) {
      throw new NotFoundException("This Post doesn't exist");
    }
    return updatedPost;
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('vote/:id')
  async increment(
    @Param('id') id: number,
    @Request() req,
  ): Promise<ProposalEntity> {
    const post = await this.proposalService.increment(id, req.user.id);
    if (!post) {
      throw new NotFoundException("This Post doesn't exist");
    }
    return post;
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() post: ProposalDto,
    @Request() req,
  ): Promise<ProposalEntity> {
    const {
      numberOfAffectedRows,
      updatedPost,
    } = await this.proposalService.update(id, post, req.user.id);
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException("This Post doesn't exist");
    }
    return updatedPost;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    const deleted = await this.proposalService.delete(id, req.user.id);
    if (deleted === 0) {
      throw new NotFoundException("This Post doesn't exist");
    }
    return 'Successfully deleted';
  }
}
