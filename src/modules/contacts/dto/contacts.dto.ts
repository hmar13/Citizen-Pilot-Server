import { IsNotEmpty, MinLength, IsEmail } from 'class-validator';

export class ContactsDto {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  @MinLength(6)
  readonly phone: number;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly image: string;
}
