import { Injectable, Inject } from '@nestjs/common';
import { Favourite } from './favourites.entity';
import { FAVOURITES_REPOSITORY } from '../../core/constants';

@Injectable()
export class FavouritesService {
  constructor(@Inject(FAVOURITES_REPOSITORY)
  private readonly favouritesRepository: typeof Favourite,
  ) { }

  async create(proposalId: number, userId: number): Promise<Favourite> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return await this.favouritesRepository.create<Favourite>({ ...proposalId, userId})
  }

  async findAll(userId): Promise<Favourite[]> {
    return await this.favouritesRepository.findAll<Favourite>(
      { where: { userId }}
    );
  }

  async delete(id, userId) {
    return await this.favouritesRepository.destroy({ where: { id, userId }})
  }
}
