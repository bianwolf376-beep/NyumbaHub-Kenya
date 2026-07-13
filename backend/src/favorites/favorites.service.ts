import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async add(userId: string, propertyId: string) {
    const exists = await this.prisma.favorite.findUnique({
      where: {
        userId_propertyId: {
          userId,
          propertyId,
        },
      },
    });

    if (exists) {
      throw new BadRequestException(
        'Property already added to favorites.',
      );
    }

    return this.prisma.favorite.create({
      data: {
        userId,
        propertyId,
      },
      include: {
        property: {
          include: {
            images: true,
            landlord: {
              select: {
                id: true,
                fullName: true,
                phone: true,
                verified: true,
              },
            },
          },
        },
      },
    });
  }

  async getUserFavorites(userId: string) {
    return this.prisma.favorite.findMany({
      where: {
        userId,
      },
      include: {
        property: {
          include: {
            images: true,
            landlord: {
              select: {
                id: true,
                fullName: true,
                phone: true,
                verified: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async remove(userId: string, propertyId: string) {
    return this.prisma.favorite.delete({
      where: {
        userId_propertyId: {
          userId,
          propertyId,
        },
      },
    });
  }
}