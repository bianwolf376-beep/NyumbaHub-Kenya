import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { VisitsService } from './visits.service';
import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitStatusDto } from './dto/update-visit-status.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('visits')
@UseGuards(JwtAuthGuard)
export class VisitsController {
  constructor(private readonly visitsService: VisitsService) {}

  @Post()
  requestVisit(@CurrentUser() user: any, @Body() dto: CreateVisitDto) {
    return this.visitsService.requestVisit(user.id, dto);
  }

  @Get('property/:propertyId')
  getPropertyVisits(@Param('propertyId') propertyId: string) {
    return this.visitsService.getPropertyVisits(propertyId);
  }

  @Get('user/my-visits')
  getUserVisits(@CurrentUser() user: any) {
    return this.visitsService.getUserVisits(user.id);
  }

  @Patch(':visitId/status')
  updateVisitStatus(
    @CurrentUser() user: any,
    @Param('visitId') visitId: string,
    @Body() dto: UpdateVisitStatusDto,
  ) {
    return this.visitsService.updateVisitStatus(visitId, user.id, dto);
  }

  @Delete(':visitId')
  cancelVisit(@CurrentUser() user: any, @Param('visitId') visitId: string) {
    return this.visitsService.cancelVisit(visitId, user.id);
  }
}
