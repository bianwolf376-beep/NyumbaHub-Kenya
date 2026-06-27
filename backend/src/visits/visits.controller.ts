import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";

import { VisitsService } from "./visits.service";

import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CurrentUser } from "../auth/decorators/current-user.decorator";

@Controller("visits")
@UseGuards(JwtAuthGuard)
export class VisitsController {
  constructor(
    private readonly visitsService: VisitsService,
  ) {}

  @Post()
  create(
    @CurrentUser() user: any,
    @Body()
    body: {
      propertyId: string;
      visitDate: string;
      notes?: string;
    },
  ) {
    return this.visitsService.create(
      user.id,
      body.propertyId,
      new Date(body.visitDate),
      body.notes,
    );
  }

  @Get("me")
  myVisits(
    @CurrentUser() user: any,
  ) {
    return this.visitsService.myVisits(user.id);
  }

  @Get("landlord")
  landlordVisits(
    @CurrentUser() user: any,
  ) {
    return this.visitsService.landlordVisits(user.id);
  }

  @Patch(":id/approve")
  approve(
    @Param("id") id: string,
  ) {
    return this.visitsService.approve(id);
  }

  @Patch(":id/decline")
  decline(
    @Param("id") id: string,
  ) {
    return this.visitsService.decline(id);
  }
}