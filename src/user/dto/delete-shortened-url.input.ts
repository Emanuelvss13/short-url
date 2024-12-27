import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

@ApiSchema({ name: 'DeleteShortenedUrlInput' })
export class DeleteShortenedUrlInput {
  @ApiProperty()
  @IsNumber()
  shortenedUrlId: number;
}
