import { IsNotEmpty, MinLength, IsEmail, IsOptional } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  readonly fname: string;

  @IsNotEmpty()
  readonly lname: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;

  @IsOptional()
  readonly favourites: string[];

  @IsOptional()
  readonly voted: number[];
}
