import { Module } from '@nestjs/common';
import { base62Provider } from '../providers/shortening-algorithm/base62.provider';
import { ShortenerController } from './shortener.controller';
import { ShortenerService } from './shortener.service';

@Module({
  controllers: [ShortenerController],
  providers: [
    ShortenerService,
    {
      provide: 'ShorteningAlgorithm',
      useClass: base62Provider,
    },
  ],
})
export class ShortenerModule {}
