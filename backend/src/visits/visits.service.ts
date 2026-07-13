import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitStatusDto } from './dto/update-visit-status.dto';

@Injectable()
export class VisitsService {
  constructor(private readonly prisma: PrismaService) {}

  async requestVisit(userId: string, dto: CreateVisitDto) {
    const property = await this.prisma.property.findUnique({
      where: { id: dto.propertyId },
    });

    if (!property) {
      throw new NotFoundException('Property not found');
    }

    const visitDate = new Date(dto.visitDate);
    if (visitDate < new Date()) {
      throw new BadRequestException('Visit date must be in the future');
    }

    return this.prisma.visitRequest.create({
      data: {
        userId,
        propertyId: dto.propertyId,
        visitDate,
        notes: dto.notes,
      },
      include: {
        user: true,
        property: {
          include: {
            landlord: true,
            images: true,
          },
        },
      },
    });
  }

  async getPropertyVisits(propertyId: string) {
    return this.prisma.visitRequest.findMany({
      where: { propertyId },
      include: {
        user: true,
        property: true,
      },
      orderBy: { visitDate: 'asc' },
    });
  }

  async getUserVisits(userId: string) {
    return this.prisma.visitRequest.findMany({
      where: { userId },
      include: {
        property: {
          include: {
            landlord: true,
            images: true,
          },
        },
      },
      orderBy: { visitDate: 'asc' },
    });
  }

  async updateVisitStatus(visitId: string, landlordId: string, dto: UpdateVisitStatusDto) {
    const visit = await this.prisma.visitRequest.findUnique({
      where: { id: visitId },
      include: { property: true },
    });

    if (!visit) {
      throw new NotFoundException('Visit request not found');
    }

    if (visit.property.landlordId !== landlordId) {
      throw new BadRequestException('Unauthorized to update this visit');
    }

    return this.prisma.visitRequest.update({
      where: { id: visitId },
      data: { status: dto.status },
      include: {
        user: true,
        property: true,
      },
    });
  }

  async cancelVisit(visitId: string, userId: string) {
    const visit = await this.prisma.visitRequest.findUnique({
      where: { id: visitId },
    });

    if (!visit || visit.userId !== userId) {
      throw new NotFoundException('Visit request not found');
    }

    return this.prisma.visitRequest.delete({
      where: { id: visitId },
    });
  }
}
