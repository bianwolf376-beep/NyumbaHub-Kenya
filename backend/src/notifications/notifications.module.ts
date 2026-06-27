import { Module } from "@nestjs/common";

import { NotificationsController } from "./notifaction.controller";
import { NotificationsService } from "./notifications.service";

import { PrismaService } from "../prisma/prisma.service";

@Module({
  controllers: [NotificationsController],
  providers: [
    NotificationsService,
    PrismaService,
  ],
  exports: [NotificationsService],
})
export class NotificationsModule {}