import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

@ApiSchema({ name: 'LoginInput' })
export class LoginInput {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}
