import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { ReviewsService } from './reviews.service';

interface JwtUser {
  id: string;
  email: string;
  role: string;
}

@Controller('reviews')
export class ReviewsController {
  constructor(
    private readonly reviewsService: ReviewsService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @CurrentUser() user: JwtUser,
    @Body()
    body: {
      propertyId: string;
      rating: number;
      comment: string;
    },
  ) {
    return await this.reviewsService.create(
      user.id,
      body.propertyId,
      body.rating,
      body.comment,
    );
  }

  @Get(':propertyId')
  async getPropertyReviews(
    @Param('propertyId') propertyId: string,
  ) {
    return await this.reviewsService.getPropertyReviews(
      propertyId,
    );
  }

  @Delete(':reviewId')
  @UseGuards(JwtAuthGuard)
  async remove(
    @CurrentUser() user: JwtUser,
    @Param('reviewId') reviewId: string,
  ) {
    return await this.reviewsService.remove(
      reviewId,
      user.id,
    );
  }
}