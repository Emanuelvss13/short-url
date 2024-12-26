import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({ name: 'CreateShortenerRequest' })
export class CreateShortenerRequest {
  @ApiProperty()
  sourceUrl: string;
}
