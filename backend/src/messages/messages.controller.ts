import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { MessagesService } from './messages.service';

interface JwtUser {
  id: string;
  email: string;
  role: string;
}

@Controller('messages')
@UseGuards(JwtAuthGuard)
export class MessagesController {
  constructor(
    private readonly messagesService: MessagesService,
  ) {}

  @Post()
  async sendMessage(
    @CurrentUser() user: JwtUser,
    @Body()
    body: {
      receiverId: string;
      message: string;
      propertyId?: string;
    },
  ) {
    return await this.messagesService.send(
      user.id,
      body.receiverId,
      body.message,
      body.propertyId,
    );
  }

  @Get()
  async inbox(
    @CurrentUser() user: JwtUser,
  ) {
    return await this.messagesService.inbox(user.id);
  }

  @Get(':userId')
  async conversation(
    @CurrentUser() user: JwtUser,
    @Param('userId') userId: string,
  ) {
    return await this.messagesService.conversation(
      user.id,
      userId,
    );
  }

  @Patch(':id/read')
  async markAsRead(
    @Param('id') id: string,
  ) {
    return await this.messagesService.markAsRead(id);
  }
}