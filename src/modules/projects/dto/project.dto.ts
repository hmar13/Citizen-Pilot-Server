import { IsNotEmpty, MinLength } from 'class-validator';
export class ProjectDto {
  @IsNotEmpty()
  @MinLength(4)
  readonly title: string;

  @IsNotEmpty()
  @MinLength(10)
  readonly description: string;

  @IsNotEmpty()
  readonly location: string;

  readonly completion: number;

  readonly image: string;
}
