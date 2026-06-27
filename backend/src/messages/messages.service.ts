import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class MessagesService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async send(
    senderId: string,
    receiverId: string,
    message: string,
    propertyId?: string,
  ) {
    const receiver = await this.prisma.user.findUnique({
      where: {
        id: receiverId,
      },
    });

    if (!receiver) {
      throw new NotFoundException("Receiver not found");
    }

    return this.prisma.message.create({
      data: {
        senderId,
        receiverId,
        propertyId,
        message,
      },
      include: {
        sender: true,
        receiver: true,
        property: true,
      },
    });
  }

  async inbox(userId: string) {
    return this.prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId },
          { receiverId: userId },
        ],
      },
      include: {
        sender: true,
        receiver: true,
        property: {
          include: {
            images: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async conversation(
    userId: string,
    otherUserId: string,
  ) {
    return this.prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: userId,
            receiverId: otherUserId,
          },
          {
            senderId: otherUserId,
            receiverId: userId,
          },
        ],
      },
      include: {
        sender: true,
        receiver: true,
        property: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  }

  async markAsRead(messageId: string) {
    return this.prisma.message.update({
      where: {
        id: messageId,
      },
      data: {
        isRead: true,
      },
    });
  }
}