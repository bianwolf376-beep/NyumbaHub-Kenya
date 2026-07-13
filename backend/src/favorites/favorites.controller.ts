import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { FavoritesService } from './favorites.service';

interface JwtUser {
  id: string;
  email: string;
  role: string;
}

@Controller('favorites')
@UseGuards(JwtAuthGuard)
export class FavoritesController {
  constructor(
    private readonly favoritesService: FavoritesService,
  ) {}

  @Post(':propertyId')
  async addFavorite(
    @CurrentUser() user: JwtUser,
    @Param('propertyId') propertyId: string,
  ) {
    return await this.favoritesService.add(
      user.id,
      propertyId,
    );
  }

  @Get()
  async getMyFavorites(
    @CurrentUser() user: JwtUser,
  ) {
    return await this.favoritesService.getUserFavorites(
      user.id,
    );
  }

  @Delete(':propertyId')
  async removeFavorite(
    @CurrentUser() user: JwtUser,
    @Param('propertyId') propertyId: string,
  ) {
    return await this.favoritesService.remove(
      user.id,
      propertyId,
    );
  }
}