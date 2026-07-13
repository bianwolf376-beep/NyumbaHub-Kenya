import { Transform } from "class-transformer";

import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";



export class LoginDto {


  @Transform(({ value }) =>
    value?.trim().toLowerCase()
  )

  @IsEmail()

  @IsNotEmpty()

  @MaxLength(150)

  email:string;





  @IsString()

  @IsNotEmpty()

  @MinLength(8)

  @MaxLength(100)

  password:string;


}