import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { newsProviders } from './news.providers';
import { NewsController } from './news.controller';

@Module({
  providers: [NewsService, ...newsProviders],
  exports: [NewsService],
  controllers: [NewsController],
})
export class NewsModule {}
