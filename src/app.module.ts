import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ShortenerModule } from './shortener/shortener.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ShortenerModule, ConfigModule.forRoot({ isGlobal: true }), AuthModule, UserModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
