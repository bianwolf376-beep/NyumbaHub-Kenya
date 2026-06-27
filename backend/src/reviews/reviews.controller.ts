import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common";

import { ReviewsService } from "./reviews.service";

import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CurrentUser } from "../auth/decorators/current-user.decorator";

@Controller("reviews")
export class ReviewsController {
  constructor(
    private readonly reviewsService: ReviewsService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @CurrentUser() user: any,
    @Body()
    body: {
      propertyId: string;
      rating: number;
      comment: string;
    },
  ) {
    return this.reviewsService.create(
      user.id,
      body.propertyId,
      body.rating,
      body.comment,
    );
  }

  @Get(":propertyId")
  getPropertyReviews(
    @Param("propertyId") propertyId: string,
  ) {
    return this.reviewsService.getPropertyReviews(
      propertyId,
    );
  }

  @Delete(":reviewId")
  @UseGuards(JwtAuthGuard)
  remove(
    @CurrentUser() user: any,
    @Param("reviewId") reviewId: string,
  ) {
    return this.reviewsService.remove(
      reviewId,
      user.id,
    );
  }
}