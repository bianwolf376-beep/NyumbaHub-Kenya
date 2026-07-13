import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { ProfileService } from './profile.service';

interface JwtUser {
  id: string;
  email: string;
  role: string;
}

@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
  ) {}

  @Get()
  async getProfile(
    @CurrentUser() user: JwtUser,
  ) {
    return await this.profileService.getProfile(user.id);
  }

  @Patch()
  async updateProfile(
    @CurrentUser() user: JwtUser,
    @Body()
    body: {
      fullName?: string;
      phone?: string;
    },
  ) {
    return await this.profileService.updateProfile(
      user.id,
      body,
    );
  }

  @Post('photo')
  @UseInterceptors(FileInterceptor('file'))
  async uploadPhoto(
    @CurrentUser() user: JwtUser,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.profileService.uploadProfilePhoto(
      user.id,
      file,
    );
  }

  @Patch('password')
  async changePassword(
    @CurrentUser() user: JwtUser,
    @Body()
    body: {
      currentPassword: string;
      newPassword: string;
    },
  ) {
    return await this.profileService.changePassword(
      user.id,
      body.currentPassword,
      body.newPassword,
    );
  }
}