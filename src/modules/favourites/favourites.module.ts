import { Module } from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { FavouritesController } from './favourites.controller';
import { favouritesProviders } from './favourites.providers';

@Module({
  providers: [FavouritesService, ...favouritesProviders],
  controllers: [FavouritesController],
})
export class FavouritesModule {}
