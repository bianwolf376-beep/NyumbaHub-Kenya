import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";
import { Transform } from "class-transformer";
import { UserRole } from "@prisma/client";

export class RegisterDto {
  @Transform(({ value }) => value?.trim())
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  fullName: string;

  @Transform(({ value }) => value?.trim().toLowerCase())
  @IsEmail()
  @MaxLength(150)
  email: string;

  @Transform(({ value }) => {
    if (!value) return value;

    let phone = value.trim();

    if (phone.startsWith("0")) {
      phone = "254" + phone.substring(1);
    }

    if (phone.startsWith("+254")) {
      phone = phone.substring(1);
    }

    return phone;
  })
  @IsString()
  @Matches(/^254(7\d{8}|1[01]\d{7})$/, {
    message: "Please provide a valid Kenyan phone number.",
  })
  phone: string;

  @Transform(({ value }) => value?.trim())
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  county: string;

  @Transform(({ value }) => value?.trim())
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  town: string;

  @IsString()
  @MinLength(8)
  @MaxLength(100)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
    message:
      "Password must contain uppercase, lowercase and number",
  })
  password: string;

  @IsEnum(UserRole)
  role: UserRole;
}