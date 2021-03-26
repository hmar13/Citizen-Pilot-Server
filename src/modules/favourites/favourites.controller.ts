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
  Put
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FavouritesService } from './favourites.service';
import { Favourite as FavouriteEntity } from './favourites.entity';
import { FavouritesDto } from './dto/favourites.dto';

@Controller('favourites')
export class FavouritesController {
  constructor(private readonly favouriteService: FavouritesService) { }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(@Request() req): Promise<FavouriteEntity[]> {
    //get all the favourites in the db based off userId
    return await this.favouriteService.findAll(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() favourite: FavouritesDto, @Request() req): Promise<FavouriteEntity> {
    //save a new favourite and return the newly created favourite
    return await this.favouriteService.create(favourite, req.user.id)
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    // delete the post with this id
    const deleted = await this.favouriteService.delete(id, req.user.id);

    // if the number of rows affected is zero then the post doesn't exist
    if (deleted === 0) {
      throw new NotFoundException('This Post Doesn\'t exist');
    }
    //return successful message
    return 'Sucessfully delete';
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(@Param('id') id: number, @Body() favourite: FavouritesDto, @Request() req): Promise<FavouriteEntity> {
      // get the row number affected and the updated favourite
      const { numberOfAffectedRows, updatedPost } = await this.favouriteService.update(
        id, favourite, req.user.id
      )

      //If the number of rows affected is zero, then the post doesn't exist
      if (numberOfAffectedRows === 0) {
        throw new NotFoundException('This Post doesn\'t exist');
      }

      // return the updated post
      return updatedPost;
    }
}
