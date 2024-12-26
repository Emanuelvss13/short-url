import { Module } from '@nestjs/common';
import { ShortenerService } from './shortener.service';
import { ShortenerController } from './shortener.controller';

@Module({
  controllers: [ShortenerController],
  providers: [ShortenerService],
})
export class ShortenerModule {}
