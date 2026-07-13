import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

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
    if (rating < 1 || rating > 5) {
      throw new BadRequestException(
        'Rating must be between 1 and 5.',
      );
    }

    const property = await this.prisma.property.findUnique({
      where: {
        id: propertyId,
      },
    });

    if (!property) {
      throw new BadRequestException(
        'Property not found.',
      );
    }

    const existing = await this.prisma.review.findFirst({
      where: {
        userId,
        propertyId,
      },
    });

    if (existing) {
      throw new BadRequestException(
        'You have already reviewed this property.',
      );
    }

    return this.prisma.review.create({
      data: {
        userId,
        propertyId,
        rating,
        comment: comment.trim(),
      },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            profilePhoto: true,
            verified: true,
          },
        },
        property: {
          select: {
            id: true,
            title: true,
            rent: true,
          },
        },
      },
    });
  }

  async getPropertyReviews(propertyId: string) {
    return this.prisma.review.findMany({
      where: {
        propertyId,
      },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            profilePhoto: true,
            verified: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async remove(
    reviewId: string,
    userId: string,
  ) {
    return this.prisma.review.deleteMany({
      where: {
        id: reviewId,
        userId,
      },
    });
  }
}