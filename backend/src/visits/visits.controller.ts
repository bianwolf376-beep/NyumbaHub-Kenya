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

import { VisitsService } from './visits.service';

interface JwtUser {
  id: string;
  email: string;
  role: string;
}

@Controller('visits')
@UseGuards(JwtAuthGuard)
export class VisitsController {
  constructor(
    private readonly visitsService: VisitsService,
  ) {}

  @Post()
  async create(
    @CurrentUser() user: JwtUser,
    @Body()
    body: {
      propertyId: string;
      visitDate: string;
      notes?: string;
    },
  ) {
    return await this.visitsService.create(
      user.id,
      body.propertyId,
      new Date(body.visitDate),
      body.notes,
    );
  }

  @Get('me')
  async myVisits(
    @CurrentUser() user: JwtUser,
  ) {
    return await this.visitsService.myVisits(user.id);
  }

  @Get('landlord')
  async landlordVisits(
    @CurrentUser() user: JwtUser,
  ) {
    return await this.visitsService.landlordVisits(
      user.id,
    );
  }

  @Patch(':id/approve')
  async approve(
    @Param('id') id: string,
  ) {
    return await this.visitsService.approve(id);
  }

  @Patch(':id/decline')
  async decline(
    @Param('id') id: string,
  ) {
    return await this.visitsService.decline(id);
  }
}