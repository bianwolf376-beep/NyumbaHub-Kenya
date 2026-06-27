import {
    IsString,
    IsNumber,
    IsBoolean,
    IsOptional,
    IsEnum,
  } from "class-validator";
  import { PropertyType } from "@prisma/client";
  
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
  
    @IsOptional()
    @IsString()
    address?: string;
  
    @IsEnum(PropertyType)
    propertyType: PropertyType;
  
    @IsNumber()
    bedrooms: number;
  
    @IsNumber()
    bathrooms: number;
  
    @IsNumber()
    rent: number;
  
    @IsNumber()
    deposit: number;
  
    @IsOptional()
    @IsBoolean()
    parking?: boolean;
  
    @IsOptional()
    @IsBoolean()
    furnished?: boolean;
  
    @IsOptional()
    @IsBoolean()
    wifi?: boolean;
  
    @IsOptional()
    @IsBoolean()
    cctv?: boolean;
  
    @IsOptional()
    @IsBoolean()
    balcony?: boolean;
  
    @IsOptional()
    @IsBoolean()
    security?: boolean;
  
    @IsOptional()
    @IsBoolean()
    borehole?: boolean;
  
    @IsOptional()
    @IsBoolean()
    swimmingPool?: boolean;
  
    @IsOptional()
    @IsBoolean()
    lift?: boolean;
  
    @IsOptional()
    @IsBoolean()
    petsAllowed?: boolean;
  
    @IsOptional()
    @IsBoolean()
    backupGenerator?: boolean;
  }