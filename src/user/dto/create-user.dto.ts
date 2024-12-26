import { IsEmail, Length } from 'class-validator';

export class CreateUserRequest {
  @IsEmail()
  email: string;

  @Length(6)
  password: string;
}
