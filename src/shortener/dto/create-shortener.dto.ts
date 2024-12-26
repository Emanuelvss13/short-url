import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { IsUrl } from 'class-validator';

@ApiSchema({ name: 'CreateShortenerRequest' })
export class CreateShortenerRequest {
  @ApiProperty()
  @IsUrl()
  sourceUrl: string;
}
