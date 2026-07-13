import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { VisitStatus } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VisitsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(
    userId: string,
    propertyId: string,
    visitDate: Date,
    notes?: string,
  ) {
    const property = await this.prisma.property.findUnique({
      where: {
        id: propertyId,
      },
    });

    if (!property) {
      throw new NotFoundException('Property not found');
    }

    if (visitDate.getTime() < Date.now()) {
      throw new BadRequestException(
        'Visit date cannot be in the past.',
      );
    }

    return this.prisma.visitRequest.create({
      data: {
        userId,
        propertyId,
        visitDate,
        notes: notes?.trim(),
      },
      include: {
        property: {
          select: {
            id: true,
            title: true,
            county: true,
            town: true,
            estate: true,
            rent: true,
          },
        },
        user: {
          select: {
            id: true,
            fullName: true,
            phone: true,
            profilePhoto: true,
          },
        },
      },
    });
  }

  async myVisits(userId: string) {
    return this.prisma.visitRequest.findMany({
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
        visitDate: 'asc',
      },
    });
  }

  async landlordVisits(landlordId: string) {
    return this.prisma.visitRequest.findMany({
      where: {
        property: {
          landlordId,
        },
      },
      include: {
        property: {
          include: {
            images: true,
          },
        },
        user: {
          select: {
            id: true,
            fullName: true,
            phone: true,
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

  async approve(id: string) {
    return this.prisma.visitRequest.update({
      where: {
        id,
      },
      data: {
        status: VisitStatus.APPROVED,
      },
    });
  }

  async decline(id: string) {
    return this.prisma.visitRequest.update({
      where: {
        id,
      },
      data: {
        status: VisitStatus.DECLINED,
      },
    });
  }
}