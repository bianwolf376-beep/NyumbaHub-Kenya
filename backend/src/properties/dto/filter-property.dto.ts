import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

import { PropertyType } from '@prisma/client';

export class FilterPropertyDto {
  @IsOptional()
  @Transform(({ value }) => value?.trim())
  @IsString()
  @MaxLength(100)
  county?: string;

  @IsOptional()
  @Transform(({ value }) => value?.trim())
  @IsString()
  @MaxLength(100)
  town?: string;

  @IsOptional()
  @Transform(({ value }) => value?.trim())
  @IsString()
  @MaxLength(100)
  estate?: string;

  @IsOptional()
  @IsEnum(PropertyType)
  propertyType?: PropertyType;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  minRent?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  maxRent?: number;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  parking?: boolean;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  furnished?: boolean;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  wifi?: boolean;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  security?: boolean;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  bedrooms?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  bathrooms?: number;
}