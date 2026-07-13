import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { PrismaService } from '../prisma/prisma.service';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class ProfileService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly supabaseService: SupabaseService,
  ) {}

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        county: true,
        town: true,
        role: true,
        profilePhoto: true,
        verified: true,
        active: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateProfile(
    userId: string,
    data: {
      fullName?: string;
      phone?: string;
    },
  ) {
    const updatedUser = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        fullName: data.fullName?.trim(),
        phone: data.phone?.trim(),
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        county: true,
        town: true,
        role: true,
        profilePhoto: true,
        verified: true,
        active: true,
        createdAt: true,
      },
    });

    return updatedUser;
  }

  async uploadProfilePhoto(
    userId: string,
    file: Express.Multer.File,
  ) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const imageUrl =
      await this.supabaseService.uploadImage(
        file,
        'profiles',
      );

    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        profilePhoto: imageUrl,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        profilePhoto: true,
        verified: true,
      },
    });
  }

  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string,
  ) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const valid = await bcrypt.compare(
      currentPassword,
      user.password,
    );

    if (!valid) {
      throw new BadRequestException(
        'Current password is incorrect',
      );
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      10,
    );

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: hashedPassword,
      },
    });

    return {
      message: 'Password changed successfully',
    };
  }
}