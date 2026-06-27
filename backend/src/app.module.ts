import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { PropertiesModule } from "./properties/properties.module";
import { SupabaseModule } from "./supabase/supabase.module";
import { FavoritesModule } from "./favorites/favorites.module";
import { VisitsModule } from "./visits/visits.module";
import { ReviewsModule } from "./reviews/reviews.module";
import { MessagesModule } from "./messages/messages.module";
import { ProfileModule } from "./profile/profile.module";
import { NotificationsModule } from "./notifications/notifications.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),

    PrismaModule,
    AuthModule,
    PropertiesModule,
    SupabaseModule,
    FavoritesModule,
    VisitsModule,
    ReviewsModule,
    MessagesModule,
    ProfileModule,
    NotificationsModule,
  ],

  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}