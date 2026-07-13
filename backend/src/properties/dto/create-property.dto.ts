import { IsString, IsOptional, IsNumber, Min, IsEnum } from 'class-validator';
import { PropertyType } from '@prisma/client';

export class CreatePropertyDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  county: string;

  @IsString()
  town: string;

  @IsString()
  estate: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsEnum(PropertyType)
  propertyType: PropertyType;

  @IsNumber()
  bedrooms: number;

  @IsNumber()
  bathrooms: number;

  @IsNumber()
  @Min(0)
  rent: number;

  @IsNumber()
  @Min(0)
  deposit: number;

  @IsOptional()
  parking?: boolean;

  @IsOptional()
  furnished?: boolean;

  @IsOptional()
  wifi?: boolean;

  @IsOptional()
  cctv?: boolean;

  @IsOptional()
  balcony?: boolean;

  @IsOptional()
  security?: boolean;

  @IsOptional()
  borehole?: boolean;

  @IsOptional()
  swimmingPool?: boolean;

  @IsOptional()
  lift?: boolean;

  @IsOptional()
  petsAllowed?: boolean;

  @IsOptional()
  backupGenerator?: boolean;
}
