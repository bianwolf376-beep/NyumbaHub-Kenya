import { Controller, Post, Get, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createReview(@CurrentUser() user: any, @Body() dto: CreateReviewDto) {
    return this.reviewsService.createReview(user.id, dto);
  }

  @Get('property/:propertyId')
  getPropertyReviews(@Param('propertyId') propertyId: string) {
    return this.reviewsService.getPropertyReviews(propertyId);
  }

  @Get('property/:propertyId/average')
  getAverageRating(@Param('propertyId') propertyId: string) {
    return this.reviewsService.getAverageRating(propertyId);
  }

  @Delete(':reviewId')
  @UseGuards(JwtAuthGuard)
  deleteReview(@CurrentUser() user: any, @Param('reviewId') reviewId: string) {
    return this.reviewsService.deleteReview(reviewId, user.id);
  }
}
