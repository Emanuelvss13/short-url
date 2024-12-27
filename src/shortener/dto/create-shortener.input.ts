import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { IsUrl } from 'class-validator';

@ApiSchema({ name: 'CreateShortenerRequest' })
export class CreateShortenerInput {
  @ApiProperty()
  @IsUrl()
  sourceUrl: string;
}
