import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  /**
   * Returns all notifications for a user.
   *
   * TODO:
   * Replace this implementation once the Notification
   * model has been added to prisma/schema.prisma.
   */
  async getNotifications(userId: string): Promise<{
    message: string;
    userId: string;
    notifications: unknown[];
  }> {
    return {
      message:
        'Notification system is not yet implemented.',
      userId,
      notifications: [],
    };
  }

  /**
   * Marks every notification as read.
   *
   * TODO:
   * Replace with a Prisma updateMany() query after
   * the Notification model has been added.
   */
  async markAllAsRead(userId: string): Promise<{
    message: string;
    userId: string;
  }> {
    return {
      message: 'All notifications marked as read.',
      userId,
    };
  }
}