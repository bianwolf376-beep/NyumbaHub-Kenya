import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from "@nestjs/common";


import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";


import {
  AuthService,
} from "./auth.service";


import {
  LoginDto,
} from "./dto/login.dto";


import {
  RegisterDto,
} from "./dto/register.dto";


import {
  CurrentUser,
} from "./decorators/current-user.decorator";


import {
  JwtAuthGuard,
} from "./guards/jwt-auth.guard";



interface JwtUser {

  id:string;

  email:string;

  role:string;

  verified:boolean;

}




@ApiTags("Authentication")

@Controller("auth")

export class AuthController {



constructor(
 private readonly authService:AuthService,
){}






@Post("register")

@ApiOperation({
 summary:
 "Register new tenant or landlord"
})

async register(

 @Body()
 dto:RegisterDto,

){


 return this.authService.register(dto);


}








@Post("login")

@ApiOperation({
 summary:
 "Login user"
})

async login(

 @Body()
 dto:LoginDto,

){


 return this.authService.login(dto);


}








@Get("me")

@UseGuards(JwtAuthGuard)

@ApiBearerAuth("access-token")

@ApiOperation({
 summary:
 "Get current logged in user"
})

async me(

 @CurrentUser()
 user:JwtUser,

){


 return this.authService.me(
   user.id
 );


}



}