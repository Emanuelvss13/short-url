import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsUrl } from 'class-validator';

@ApiSchema({ name: 'CreateShortenerRequest' })
export class CreateShortenerInput {
  @ApiProperty()
  @IsUrl()
  sourceUrl: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  expiredAt?: Date;
}
