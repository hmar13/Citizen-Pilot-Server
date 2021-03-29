import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  NotFoundException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FavouritesService } from './favourites.service';
import { Favourite as FavouriteEntity } from './favourites.entity';

@Controller('favourites')
export class FavouritesController {
  constructor(private readonly favouriteService: FavouritesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(@Request() req): Promise<FavouriteEntity[]> {
    return await this.favouriteService.findAll(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Body() proposalId: number,
    @Request() req,
  ): Promise<FavouriteEntity> {
    return await this.favouriteService.create(proposalId, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    const deleted = await this.favouriteService.delete(id, req.user.id);

    if (deleted === 0) {
      throw new NotFoundException("This Post Doesn't exist");
    }

    return 'Sucessfully delete';
  }
}
