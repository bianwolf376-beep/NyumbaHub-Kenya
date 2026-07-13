import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

import { JwtService } from "@nestjs/jwt";

import * as bcrypt from "bcrypt";

import { PrismaService } from "../prisma/prisma.service";

import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";



@Injectable()
export class AuthService {


constructor(
 private readonly prisma:PrismaService,
 private readonly jwtService:JwtService,
){}






async register(
 dto:RegisterDto,
){


const email =
dto.email.trim().toLowerCase();



const existingEmail =
await this.prisma.user.findUnique({

 where:{
  email,
 },

});



if(existingEmail){

 throw new BadRequestException(
  "Email already exists"
 );

}





const existingPhone =
await this.prisma.user.findUnique({

 where:{
  phone:dto.phone,
 },

});



if(existingPhone){

 throw new BadRequestException(
  "Phone number already exists"
 );

}






const hashedPassword =
await bcrypt.hash(
 dto.password,
 10,
);







const user =
await this.prisma.user.create({

data:{

 fullName:
 dto.fullName.trim(),

 email,


 phone:
 dto.phone.trim(),


 county:
 dto.county,


 town:
 dto.town,


 password:
 hashedPassword,


 role:
 dto.role === "LANDLORD"
 ? "LANDLORD"
 : "TENANT",

},


});







const accessToken =
await this.jwtService.signAsync({

 id:user.id,

 email:user.email,

 role:user.role,

 verified:user.verified,

});






const {
 password,
 ...safeUser
}=user;






return {

 message:
 "Registration successful",


 access_token:
 accessToken,


 user:
 safeUser,

};



}









async login(
 dto:LoginDto,
){



const email =
dto.email.trim().toLowerCase();





const user =
await this.prisma.user.findUnique({

where:{
 email,
},

});





if(!user){

 throw new UnauthorizedException(
 "Invalid email or password"
 );

}





if(!user.active){

 throw new UnauthorizedException(
 "Account disabled"
 );

}






const passwordMatches =
await bcrypt.compare(

 dto.password,

 user.password

);






if(!passwordMatches){

 throw new UnauthorizedException(
 "Invalid email or password"
 );

}






const accessToken =
await this.jwtService.signAsync({

 id:user.id,

 email:user.email,

 role:user.role,

 verified:user.verified,

});





const {
 password,
 ...safeUser
}=user;






return{

 message:
 "Login successful",


 access_token:
 accessToken,


 user:
 safeUser,

};



}









async me(
 userId:string,
){



const user =
await this.prisma.user.findUnique({

where:{
 id:userId,
},


include:{


properties:{

 include:{
  images:true,
 },

},


favorites:true,


},


});





if(!user){

 throw new UnauthorizedException(
 "User not found"
 );

}





const {
 password,
 ...safeUser
}=user;





return safeUser;



}


}