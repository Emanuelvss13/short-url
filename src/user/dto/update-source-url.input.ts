import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { IsNumber, IsUrl } from 'class-validator';

@ApiSchema({ name: 'UpdateSourceUrlInput' })
export class UpdateSourceUrlInput {
  @ApiProperty()
  @IsNumber()
  shortenedUrlId: number;

  @ApiProperty()
  @IsUrl()
  newSourceUrl: string;
}
