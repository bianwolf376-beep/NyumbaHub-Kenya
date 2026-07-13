import { Controller, Post, Get, Patch, Param, Body, UseGuards, Query } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('messages')
@UseGuards(JwtAuthGuard)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  sendMessage(@CurrentUser() user: any, @Body() dto: CreateMessageDto) {
    return this.messagesService.sendMessage(user.id, dto);
  }

  @Get('conversation/:otherUserId')
  getConversation(
    @CurrentUser() user: any,
    @Param('otherUserId') otherUserId: string,
    @Query('limit') limit?: number,
  ) {
    return this.messagesService.getConversation(user.id, otherUserId, limit);
  }

  @Get()
  getUserMessages(@CurrentUser() user: any) {
    return this.messagesService.getUserMessages(user.id);
  }

  @Get('unread/count')
  getUnreadCount(@CurrentUser() user: any) {
    return this.messagesService.getUnreadCount(user.id);
  }

  @Patch(':messageId/read')
  markAsRead(@CurrentUser() user: any, @Param('messageId') messageId: string) {
    return this.messagesService.markAsRead(messageId, user.id);
  }
}
