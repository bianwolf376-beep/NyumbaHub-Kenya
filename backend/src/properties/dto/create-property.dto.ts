import { Type } from "class-transformer";

import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from "class-validator";

import {
  PropertyType,
} from "@prisma/client";



export class CreatePropertyDto {


  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  title:string;




  @IsString()
  @IsNotEmpty()
  @MaxLength(5000)
  description:string;




  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  county:string;




  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  town:string;




  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  estate:string;




  @IsOptional()
  @IsString()
  @MaxLength(255)
  address?:string;





  @IsEnum(PropertyType)
  propertyType:PropertyType;






  @Type(()=>Number)
  @IsNumber()
  @Min(0)
  @Max(20)
  bedrooms:number;






  @Type(()=>Number)
  @IsNumber()
  @Min(0)
  @Max(20)
  bathrooms:number;






  @Type(()=>Number)
  @IsNumber()
  @Min(0)
  @Max(1000000)
  rent:number;






  @Type(()=>Number)
  @IsNumber()
  @Min(0)
  @Max(5000000)
  deposit:number;







  // MAP LOCATION


  @IsOptional()
  @Type(()=>Number)
  @IsNumber()
  latitude?:number;



  @IsOptional()
  @Type(()=>Number)
  @IsNumber()
  longitude?:number;







  // FEATURES


  @IsOptional()
  @Type(()=>Boolean)
  @IsBoolean()
  parking?:boolean;




  @IsOptional()
  @Type(()=>Boolean)
  @IsBoolean()
  furnished?:boolean;




  @IsOptional()
  @Type(()=>Boolean)
  @IsBoolean()
  wifi?:boolean;




  @IsOptional()
  @Type(()=>Boolean)
  @IsBoolean()
  cctv?:boolean;




  @IsOptional()
  @Type(()=>Boolean)
  @IsBoolean()
  balcony?:boolean;




  @IsOptional()
  @Type(()=>Boolean)
  @IsBoolean()
  security?:boolean;




  @IsOptional()
  @Type(()=>Boolean)
  @IsBoolean()
  borehole?:boolean;




  @IsOptional()
  @Type(()=>Boolean)
  @IsBoolean()
  swimmingPool?:boolean;




  @IsOptional()
  @Type(()=>Boolean)
  @IsBoolean()
  lift?:boolean;




  @IsOptional()
  @Type(()=>Boolean)
  @IsBoolean()
  petsAllowed?:boolean;




  @IsOptional()
  @Type(()=>Boolean)
  @IsBoolean()
  backupGenerator?:boolean;

}