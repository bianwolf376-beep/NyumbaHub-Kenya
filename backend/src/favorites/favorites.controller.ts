import { Controller, Post, Get, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { AddFavoriteDto } from './dto/add-favorite.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('favorites')
@UseGuards(JwtAuthGuard)
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  addFavorite(@CurrentUser() user: any, @Body() dto: AddFavoriteDto) {
    return this.favoritesService.addFavorite(user.id, dto);
  }

  @Get()
  getFavorites(@CurrentUser() user: any) {
    return this.favoritesService.getFavorites(user.id);
  }

  @Get('is-favorite/:propertyId')
  isFavorite(@CurrentUser() user: any, @Param('propertyId') propertyId: string) {
    return this.favoritesService.isFavorite(user.id, propertyId);
  }

  @Delete(':propertyId')
  removeFavorite(@CurrentUser() user: any, @Param('propertyId') propertyId: string) {
    return this.favoritesService.removeFavorite(user.id, propertyId);
  }
}
