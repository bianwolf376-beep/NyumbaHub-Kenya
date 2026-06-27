import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  UseGuards,
} from "@nestjs/common";

import { FavoritesService } from "./favorites.service";

import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CurrentUser } from "../auth/decorators/current-user.decorator";

@Controller("favorites")
@UseGuards(JwtAuthGuard)
export class FavoritesController {
  constructor(
    private readonly favoritesService: FavoritesService,
  ) {}

  @Post(":propertyId")
  addFavorite(
    @CurrentUser() user: any,
    @Param("propertyId") propertyId: string,
  ) {
    return this.favoritesService.add(
      user.id,
      propertyId,
    );
  }

  @Get()
  getMyFavorites(
    @CurrentUser() user: any,
  ) {
    return this.favoritesService.getUserFavorites(
      user.id,
    );
  }

  @Delete(":propertyId")
  removeFavorite(
    @CurrentUser() user: any,
    @Param("propertyId") propertyId: string,
  ) {
    return this.favoritesService.remove(
      user.id,
      propertyId,
    );
  }
}