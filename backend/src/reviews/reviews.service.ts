import {
  Injectable,
  BadRequestException,
} from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ReviewsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(
    userId: string,
    propertyId: string,
    rating: number,
    comment: string,
  ) {
    const property = await this.prisma.property.findUnique({
      where: { id: propertyId },
    });

    if (!property) {
      throw new BadRequestException("Property not found.");
    }

    const existing = await this.prisma.review.findFirst({
      where: {
        userId,
        propertyId,
      },
    });

    if (existing) {
      throw new BadRequestException(
        "You have already reviewed this property.",
      );
    }

    return this.prisma.review.create({
      data: {
        userId,
        propertyId,
        rating,
        comment,
      },
      include: {
        user: true,
        property: true,
      },
    });
  }

  async getPropertyReviews(propertyId: string) {
    return this.prisma.review.findMany({
      where: {
        propertyId,
      },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async remove(reviewId: string, userId: string) {
    return this.prisma.review.deleteMany({
      where: {
        id: reviewId,
        userId,
      },
    });
  }
}