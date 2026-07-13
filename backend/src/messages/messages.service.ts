import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessagesService {
  constructor(private readonly prisma: PrismaService) {}

  async sendMessage(senderId: string, dto: CreateMessageDto) {
    const receiver = await this.prisma.user.findUnique({
      where: { id: dto.receiverId },
    });

    if (!receiver) {
      throw new NotFoundException('Receiver not found');
    }

    return this.prisma.message.create({
      data: {
        senderId,
        receiverId: dto.receiverId,
        message: dto.message,
        propertyId: dto.propertyId,
      },
      include: {
        sender: true,
        receiver: true,
        property: true,
      },
    });
  }

  async getConversation(userId: string, otherUserId: string, limit = 50) {
    return this.prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId, receiverId: otherUserId },
          { senderId: otherUserId, receiverId: userId },
        ],
      },
      include: {
        sender: true,
        receiver: true,
        property: true,
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  async getUserMessages(userId: string) {
    return this.prisma.message.findMany({
      where: {
        receiverId: userId,
      },
      include: {
        sender: true,
        property: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async markAsRead(messageId: string, userId: string) {
    const message = await this.prisma.message.findUnique({
      where: { id: messageId },
    });

    if (!message || message.receiverId !== userId) {
      throw new NotFoundException('Message not found');
    }

    return this.prisma.message.update({
      where: { id: messageId },
      data: { isRead: true },
      include: {
        sender: true,
        receiver: true,
      },
    });
  }

  async getUnreadCount(userId: string) {
    return this.prisma.message.count({
      where: {
        receiverId: userId,
        isRead: false,
      },
    });
  }
}
