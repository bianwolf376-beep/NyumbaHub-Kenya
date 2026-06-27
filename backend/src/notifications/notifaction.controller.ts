import {
  Controller,
  Get,
  Patch,
  UseGuards,
} from "@nestjs/common";

import { NotificationsService } from "./notifications.service";

import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CurrentUser } from "../auth/decorators/current-user.decorator";

@Controller("notifications")
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationsService,
  ) {}

  @Get()
  getNotifications(
    @CurrentUser() user: any,
  ) {
    return this.notificationsService.getNotifications(
      user.id,
    );
  }

  @Patch("read")
  markAllAsRead(
    @CurrentUser() user: any,
  ) {
    return this.notificationsService.markAllAsRead(
      user.id,
    );
  }
}