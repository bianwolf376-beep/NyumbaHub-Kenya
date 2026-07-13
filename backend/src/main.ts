import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Security middleware
  app.use(helmet());

  // API prefix
  app.setGlobalPrefix('api');

  // CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Global exception filter
  app.useGlobalFilters(new AllExceptionsFilter());

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('NyumbaHub Kenya API')
    .setDescription('Backend API for NyumbaHub Kenya - Property Marketplace')
    .setVersion('1.0.0')
    .addBearerAuth()
    .addTag('Auth', 'Authentication endpoints')
    .addTag('Properties', 'Property management endpoints')
    .addTag('Favorites', 'Favorites management endpoints')
    .addTag('Reviews', 'Reviews and ratings endpoints')
    .addTag('Messages', 'Messaging endpoints')
    .addTag('Visits', 'Visit requests endpoints')
    .addTag('Profile', 'User profile endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT || 3001;
  await app.listen(port);

  console.log(`\n🚀 Backend running on http://localhost:${port}/api`);
  console.log(`📚 Swagger Docs: http://localhost:${port}/docs\n`);
}

bootstrap();
