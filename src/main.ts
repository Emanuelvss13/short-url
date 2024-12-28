import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as Sentry from '@sentry/nestjs';
import { nodeProfilingIntegration } from '@sentry/profiling-node';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  Sentry.init({
    dsn: process.env.SENTRY_DNS,
    integrations: [nodeProfilingIntegration()],
    tracesSampleRate: 1.0,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true, // Essa opção automaticamente transforma objetos de entrada
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Short URL API')
    .setDescription(
      'An URL shortener is a tool that takes a long URL and converts it into a shorter, more compact version while still redirecting users to the original destination. This is often used to make URLs more manageable, easier to share, and aesthetically cleaner for things like social media posts, marketing campaigns, or emails.',
    )
    .setVersion('0.1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
