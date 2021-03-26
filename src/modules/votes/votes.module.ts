import { Module } from '@nestjs/common';
import { votesProviders } from './votes.providers';
import { VotesService } from './votes.service';
import { VotesController } from './votes.controller';

@Module({
  providers: [VotesService, ...votesProviders],
  controllers: [VotesController]
})
export class VotesModule {}
