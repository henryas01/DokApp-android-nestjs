import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ValidationPipe,
  ClassSerializerInterceptor,
  Logger,
} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //  Enable CORS (important for Android / web requests)
  app.enableCors({
    origin: '*', // 🔒 In production, replace '*' with your Android app's base URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });

  //  Set a global prefix (optional, but good for versioning)
  app.setGlobalPrefix('api');

  //  Enable global validation (for DTOs)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strip unknown properties
      forbidNonWhitelisted: true, // throw error on unknown properties
      transform: true, // auto-convert types (e.g. string to number)
    }),
  );

  //  Enable automatic class-transformer serialization
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  //  Start server
  const port = Number(process.env.PORT) || 3000;
  await app.listen(port);

  // Log startup
  Logger.log(`Server is running on http://localhost:${port}/api`, 'Bootstrap');
}
bootstrap();
