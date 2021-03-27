import { IsNotEmpty, MinLength } from 'class-validator';

export class FavouritesDto {
  @IsNotEmpty()
  @MinLength(4)
  readonly title: string;

  @IsNotEmpty()
  readonly type: string;

  @IsNotEmpty()
  @MinLength(10)
  readonly description: string;

  @IsNotEmpty()
  readonly location: string;

  @IsNotEmpty()
  readonly image: string;

  readonly votes: number;

  readonly completion: string;
}