import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ShortenerModule } from './shortener/shortener.module';

@Module({
  imports: [ShortenerModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
