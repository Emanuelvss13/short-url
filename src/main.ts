import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Short URL API')
    .setDescription(
      'An URL shortener is a tool that takes a long URL and converts it into a shorter, more compact version while still redirecting users to the original destination. This is often used to make URLs more manageable, easier to share, and aesthetically cleaner for things like social media posts, marketing campaigns, or emails.',
    )
    .setVersion('0.1.0')
    .build();

  app.useGlobalPipes(new ValidationPipe());

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
