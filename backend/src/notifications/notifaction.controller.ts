import {
  Controller,
  Get,
  Patch,
  UseGuards,
} from '@nestjs/common';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { NotificationsService } from './notifications.service';

interface JwtUser {
  id: string;
  email: string;
  role: string;
}

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationsService,
  ) {}

  @Get()
  async getNotifications(
    @CurrentUser() user: JwtUser,
  ) {
    return await this.notificationsService.getNotifications(
      user.id,
    );
  }

  @Patch('read')
  async markAllAsRead(
    @CurrentUser() user: JwtUser,
  ) {
    return await this.notificationsService.markAllAsRead(
      user.id,
    );
  }
}