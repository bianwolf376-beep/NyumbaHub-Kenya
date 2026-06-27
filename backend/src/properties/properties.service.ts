import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { SupabaseService } from "../supabase/supabase.service";

import { Prisma } from "@prisma/client";
import { Express } from "express";

import { CreatePropertyDto } from "./dto/create-property.dto";
import { UpdatePropertyDto } from "./dto/update-property.dto";
import { FilterPropertyDto } from "./dto/filter-property.dto";

@Injectable()
export class PropertiesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly supabaseService: SupabaseService,
  ) {}

  async create(
    dto: CreatePropertyDto,
    landlordId: string,
  ) {
    return this.prisma.property.create({
      data: {
        ...dto,
        landlordId,
      },
      include: {
        landlord: true,
        images: true,
      },
    });
  }

  async uploadImages(
    propertyId: string,
    files: Express.Multer.File[],
  ) {
    await this.findOne(propertyId);

    const imageUrls =
      await this.supabaseService.uploadImages(
        files,
        `properties/${propertyId}`,
      );

    await this.prisma.propertyImage.createMany({
      data: imageUrls.map((url) => ({
        propertyId,
        imageUrl: url,
      })),
    });

    return this.prisma.property.findUnique({
      where: {
        id: propertyId,
      },
      include: {
        landlord: true,
        images: true,
      },
    });
  }

  async findAll(
    filters: FilterPropertyDto,
  ) {
    const where: Prisma.PropertyWhereInput = {};

    if (filters.county) {
      where.county = {
        contains: filters.county,
        mode: "insensitive",
      };
    }

    if (filters.town) {
      where.town = {
        contains: filters.town,
        mode: "insensitive",
      };
    }

    if (filters.estate) {
      where.estate = {
        contains: filters.estate,
        mode: "insensitive",
      };
    }

    if (filters.propertyType) {
      where.propertyType = filters.propertyType;
    }

    if (filters.bedrooms) {
      where.bedrooms = Number(filters.bedrooms);
    }

    if (filters.bathrooms) {
      where.bathrooms = Number(filters.bathrooms);
    }

    if (filters.minRent || filters.maxRent) {
      where.rent = {};

      if (filters.minRent) {
        where.rent.gte = new Prisma.Decimal(
          filters.minRent,
        );
      }

      if (filters.maxRent) {
        where.rent.lte = new Prisma.Decimal(
          filters.maxRent,
        );
      }
    }

    if (filters.parking) {
      where.parking =
        filters.parking === "true";
    }

    if (filters.furnished) {
      where.furnished =
        filters.furnished === "true";
    }

    if (filters.wifi) {
      where.wifi =
        filters.wifi === "true";
    }

    if (filters.security) {
      where.security =
        filters.security === "true";
    }

    return this.prisma.property.findMany({
      where,
      include: {
        landlord: true,
        images: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
  async findOne(id: string) {
    const property =
      await this.prisma.property.findUnique({
        where: {
          id,
        },
        include: {
          landlord: true,
          images: true,
          reviews: true,
        },
      });

    if (!property) {
      throw new NotFoundException(
        "Property not found",
      );
    }

    return property;
  }

  async update(
    id: string,
    dto: UpdatePropertyDto,
  ) {
    await this.findOne(id);

    return this.prisma.property.update({
      where: {
        id,
      },
      data: dto,
    });
  }

  async remove(id: string) {
    const property =
      await this.findOne(id);

    if (property.images.length) {
      for (const image of property.images) {
        await this.supabaseService.deleteImage(
          image.imageUrl,
        );
      }

      await this.prisma.propertyImage.deleteMany({
        where: {
          propertyId: id,
        },
      });
    }

    return this.prisma.property.delete({
      where: {
        id,
      },
    });
  }
}