import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { FavoritesModule } from './favorites/favorites.module';
import { MessagesModule } from './messages/messages.module';
import { NotificationsModule } from './notifications/notifications.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProfileModule } from './profile/profile.module';
import { PropertiesModule } from './properties/properties.module';
import { ReviewsModule } from './reviews/reviews.module';
import { SupabaseModule } from './supabase/supabase.module';
import { VisitsModule } from './visits/visits.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      expandVariables: true,
      cache: true,
    }),

    PrismaModule,

    AuthModule,
    ProfileModule,
    PropertiesModule,
    FavoritesModule,
    ReviewsModule,
    MessagesModule,
    NotificationsModule,
    VisitsModule,
    SupabaseModule,
  ],

  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}