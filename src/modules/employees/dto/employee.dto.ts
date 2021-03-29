import { IsNotEmpty, MinLength, IsEmail } from 'class-validator';

export class EmployeeDto {
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

  readonly deparment: string;

  readonly position: string;

  readonly access: string;
}
