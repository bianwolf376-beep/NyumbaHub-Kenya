import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsString,
    MinLength,
  } from "class-validator";
  
  import { UserRole } from "@prisma/client";
  
  export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    fullName: string;
  
    @IsEmail()
    email: string;
  
    @IsString()
    phone: string;
  
    @IsString()
    @MinLength(6)
    password: string;
  
    @IsEnum(UserRole)
    role: UserRole;
  }