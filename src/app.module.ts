import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ShortenerModule } from './shortener/shortener.module';

@Module({
  imports: [ShortenerModule],
  controllers: [],
  providers: [PrismaClient],
})
export class AppModule {}
