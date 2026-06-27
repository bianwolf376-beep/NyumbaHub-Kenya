import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";

import { PropertiesService } from "./properties.service";

import { CreatePropertyDto } from "./dto/create-property.dto";
import { UpdatePropertyDto } from "./dto/update-property.dto";
import { FilterPropertyDto } from "./dto/filter-property.dto";

import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CurrentUser } from "../auth/decorators/current-user.decorator";

@Controller("properties")
export class PropertiesController {
  constructor(
    private readonly propertiesService: PropertiesService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() dto: CreatePropertyDto,
    @CurrentUser() user: any,
  ) {
    return this.propertiesService.create(dto, user.id);
  }

  @Post(":id/images")
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor("images", 10))
  uploadImages(
    @Param("id") id: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.propertiesService.uploadImages(id, files);
  }

  @Get()
  findAll(@Query() filters: FilterPropertyDto) {
    return this.propertiesService.findAll(filters);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.propertiesService.findOne(id);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  update(
    @Param("id") id: string,
    @Body() dto: UpdatePropertyDto,
  ) {
    return this.propertiesService.update(id, dto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  remove(
    @Param("id") id: string,
  ) {
    return this.propertiesService.remove(id);
  }
}
