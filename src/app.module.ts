import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { SentryGlobalFilter, SentryModule } from '@sentry/nestjs/setup';
import { AuthModule } from './auth/auth.module';
import { ShortenerModule } from './shortener/shortener.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    SentryModule.forRoot(),
    ShortenerModule,
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: SentryGlobalFilter,
    },
  ],
  exports: [],
})
export class AppModule {}
