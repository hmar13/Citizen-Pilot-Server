import { Module } from '@nestjs/common';
import { ProposalsService } from './proposals.service';
import { ProposalsController } from './proposals.controller';
import { proposalsProviders } from './proposals.providers';
import { VotesModule } from '../votes/votes.module';

@Module({
  imports: [VotesModule],
  providers: [ProposalsService, ...proposalsProviders],
  controllers: [ProposalsController]
})
export class ProposalsModule {}
