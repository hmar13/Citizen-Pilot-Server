import { IsNotEmpty } from 'class-validator';

export class FavouritesDto {
  @IsNotEmpty()
  readonly proposalId: number;
}
