import { Controller, UseGuards, Request, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { VotesService } from './votes.service';

@Controller('votes')
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

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
