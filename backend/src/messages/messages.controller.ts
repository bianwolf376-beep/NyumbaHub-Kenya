import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";

import { MessagesService } from "./messages.service";

import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CurrentUser } from "../auth/decorators/current-user.decorator";

@Controller("messages")
@UseGuards(JwtAuthGuard)
export class MessagesController {
  constructor(
    private readonly messagesService: MessagesService,
  ) {}

  @Post()
  sendMessage(
    @CurrentUser() user: any,
    @Body()
    body: {
      receiverId: string;
      message: string;
      propertyId?: string;
    },
  ) {
    return this.messagesService.send(
      user.id,
      body.receiverId,
      body.message,
      body.propertyId,
    );
  }

  @Get()
  inbox(
    @CurrentUser() user: any,
  ) {
    return this.messagesService.inbox(user.id);
  }

  @Get(":userId")
  conversation(
    @CurrentUser() user: any,
    @Param("userId") userId: string,
  ) {
    return this.messagesService.conversation(
      user.id,
      userId,
    );
  }

  @Patch(":id/read")
  markAsRead(
    @Param("id") id: string,
  ) {
    return this.messagesService.markAsRead(id);
  }
}