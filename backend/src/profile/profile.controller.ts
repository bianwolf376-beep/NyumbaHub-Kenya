import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

import { ProfileService } from "./profile.service";

import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CurrentUser } from "../auth/decorators/current-user.decorator";

@Controller("profile")
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
  ) {}

  @Get()
  getProfile(
    @CurrentUser() user: any,
  ) {
    return this.profileService.getProfile(user.id);
  }

  @Patch()
  updateProfile(
    @CurrentUser() user: any,
    @Body()
    body: {
      fullName?: string;
      phone?: string;
    },
  ) {
    return this.profileService.updateProfile(
      user.id,
      body,
    );
  }

  @Post("photo")
  @UseInterceptors(FileInterceptor("file"))
  uploadPhoto(
    @CurrentUser() user: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.profileService.uploadProfilePhoto(
      user.id,
      file,
    );
  }

  @Patch("password")
  changePassword(
    @CurrentUser() user: any,
    @Body()
    body: {
      currentPassword: string;
      newPassword: string;
    },
  ) {
    return this.profileService.changePassword(
      user.id,
      body.currentPassword,
      body.newPassword,
    );
  }
}