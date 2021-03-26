import { Injectable, Inject } from '@nestjs/common';
import { Favourite } from './favourites.entity';
import { FavouritesDto } from './dto/favourites.dto';
import { User } from '../users/user.entity';
import { FAVOURITES_REPOSITORY } from '../../core/constants';

@Injectable()
export class FavouritesService {
  constructor(@Inject(FAVOURITES_REPOSITORY) private readonly favouritesRepository: typeof Favourite) { }

  async create(favourites: FavouritesDto, userId): Promise<Favourite> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return await this.favouritesRepository.create<Favourite>({ ...favourites, userId})
  }

  async findAll(userId): Promise<Favourite[]> {
    return await this.favouritesRepository.findAll<Favourite>(
      { where: { userId }}
    );
  }

  async delete(id, userId) {
    return await this.favouritesRepository.destroy({ where: { id, userId }})
  }

  async update(id, data, userId) {
    const [numberOfAffectedRows, [updatedPost]] = await this.favouritesRepository.update(
      { ...data }, { where: { id, userId }, returning: true });

    return { numberOfAffectedRows, updatedPost };
  }
}
