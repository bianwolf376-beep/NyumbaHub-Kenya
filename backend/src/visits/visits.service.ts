import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { VisitStatus } from "@prisma/client";

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
      where: { id: propertyId },
    });

    if (!property) {
      throw new NotFoundException("Property not found");
    }

    return this.prisma.visitRequest.create({
      data: {
        userId,
        propertyId,
        visitDate,
        notes,
      },
      include: {
        property: true,
        user: true,
      },
    });
  }

  async myVisits(userId: string) {
    return this.prisma.visitRequest.findMany({
      where: { userId },
      include: {
        property: {
          include: {
            images: true,
            landlord: true,
          },
        },
      },
      orderBy: {
        visitDate: "asc",
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
        property: true,
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async approve(id: string) {
    return this.prisma.visitRequest.update({
      where: { id },
      data: {
        status: VisitStatus.APPROVED,
      },
    });
  }

  async decline(id: string) {
    return this.prisma.visitRequest.update({
      where: { id },
      data: {
        status: VisitStatus.DECLINED,
      },
    });
  }
}