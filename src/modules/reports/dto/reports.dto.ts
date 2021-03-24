import { IsNotEmpty, MinLength } from 'class-validator';

export class ReportsDto {
  @IsNotEmpty()
  readonly urgency: boolean;

  @IsNotEmpty()
  readonly description: string;

  @IsNotEmpty()
  @MinLength(2)
  readonly longitude: string;

  @IsNotEmpty()
  @MinLength(2)
  readonly latitude: string;

  @IsNotEmpty()
  readonly category: string;

  readonly image: string;
}
