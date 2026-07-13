import {
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerModule,
} from '@nestjs/swagger';

import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  // Global API Prefix
  app.setGlobalPrefix('api');

  // API Versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      validateCustomDecorators: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Global Exception Filter
  app.useGlobalFilters(
    new AllExceptionsFilter(),
  );

  // CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL
      ? [process.env.FRONTEND_URL]
      : ['http://localhost:3000'],
    credentials: true,
    methods: [
      'GET',
      'POST',
      'PUT',
      'PATCH',
      'DELETE',
      'OPTIONS',
    ],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
    ],
  });

  // Graceful shutdown
  app.enableShutdownHooks();

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('NyumbaHub Kenya API')
    .setDescription(
      'Backend API for NyumbaHub Kenya',
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(
    app,
    config,
  );

  SwaggerModule.setup('docs', app, document, {
    jsonDocumentUrl: 'docs/json',
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  const port = Number(process.env.PORT) || 3001;

  await app.listen(port);

  console.log('================================');
  console.log(`🚀 Server    : http://localhost:${port}`);
  console.log(`📡 API       : http://localhost:${port}/api`);
  console.log(`📚 Swagger   : http://localhost:${port}/docs`);
  console.log('================================');
}

bootstrap();