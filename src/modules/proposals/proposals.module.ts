import { Module } from '@nestjs/common';
import { ProposalsService } from './proposals.service';
import { ProposalsController } from './proposals.controller';
import { proposalsProviders } from './proposals.providers';

@Module({
  providers: [ProposalsService, ...proposalsProviders],
  controllers: [ProposalsController]
})
export class ProposalsModule {}
