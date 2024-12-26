import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma-client';
import { ShortenedUrlPrismaRepository } from '../providers/database/prisma/shortend-url-prisma.repository';
import { base62Provider } from '../providers/shortening-algorithm/base62.provider';
import { ShortenerController } from './shortener.controller';
import { ShortenerService } from './shortener.service';

@Module({
  controllers: [ShortenerController],
  providers: [
    PrismaService,
    ShortenerService,
    {
      provide: 'ShortenedUrlRepository',
      useClass: ShortenedUrlPrismaRepository,
    },
    {
      provide: 'ShorteningAlgorithm',
      useClass: base62Provider,
    },
  ],
})
export class ShortenerModule {}
