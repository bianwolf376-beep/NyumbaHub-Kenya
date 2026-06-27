import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";

import { PropertiesController } from "./properties.controller";
import { PropertiesService } from "./properties.service";

import { PrismaService } from "../prisma/prisma.service";
import { SupabaseModule } from "../supabase/supabase.module";

@Module({
  imports: [
    SupabaseModule,
    MulterModule.register({
      limits: {
        fileSize: 5 * 1024 * 1024,
      },
    }),
  ],
  controllers: [PropertiesController],
  providers: [
    PropertiesService,
    PrismaService,
  ],
  exports: [PropertiesService],
})
export class PropertiesModule {}