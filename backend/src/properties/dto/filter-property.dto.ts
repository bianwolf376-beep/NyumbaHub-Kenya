import {
    IsBooleanString,
    IsEnum,
    IsNumberString,
    IsOptional,
    IsString,
  } from "class-validator";
  
  import { PropertyType } from "@prisma/client";
  
  export class FilterPropertyDto {
    @IsOptional()
    @IsString()
    county?: string;
  
    @IsOptional()
    @IsString()
    town?: string;
  
    @IsOptional()
    @IsString()
    estate?: string;
  
    @IsOptional()
    @IsEnum(PropertyType)
    propertyType?: PropertyType;
  
    @IsOptional()
    @IsNumberString()
    minRent?: string;
  
    @IsOptional()
    @IsNumberString()
    maxRent?: string;
  
    @IsOptional()
    @IsBooleanString()
    parking?: string;
  
    @IsOptional()
    @IsBooleanString()
    furnished?: string;
  
    @IsOptional()
    @IsBooleanString()
    wifi?: string;
  
    @IsOptional()
    @IsBooleanString()
    security?: string;
    @IsOptional()
    @IsNumberString()
    bedrooms?: string;
  
    @IsOptional()
    @IsNumberString()
    bathrooms?: string;
  }