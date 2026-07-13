import {
  IsOptional,
  IsString,
  IsNumber,
  IsBoolean,
  IsEnum,
} from 'class-validator';
import { PropertyType } from '@prisma/client';

export class FilterPropertyDto {
  @IsString()
  @IsOptional()
  county?: string;

  @IsString()
  @IsOptional()
  town?: string;

  @IsString()
  @IsOptional()
  estate?: string;

  @IsEnum(PropertyType)
  @IsOptional()
  propertyType?: PropertyType;

  @IsNumber()
  @IsOptional()
  bedrooms?: number;

  @IsNumber()
  @IsOptional()
  bathrooms?: number;

  @IsNumber()
  @IsOptional()
  minRent?: number;

  @IsNumber()
  @IsOptional()
  maxRent?: number;

  @IsBoolean()
  @IsOptional()
  parking?: boolean;

  @IsBoolean()
  @IsOptional()
  furnished?: boolean;

  @IsBoolean()
  @IsOptional()
  wifi?: boolean;

  @IsBoolean()
  @IsOptional()
  security?: boolean;

  @IsString()
  @IsOptional()
  sortBy?: 'newest' | 'popular' | 'price-low' | 'price-high';

  @IsNumber()
  @IsOptional()
  page?: number;

  @IsNumber()
  @IsOptional()
  limit?: number;
}
