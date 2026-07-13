import {
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";


import {
  ConfigService,
} from "@nestjs/config";


import {
  PassportStrategy,
} from "@nestjs/passport";


import {
  ExtractJwt,
  Strategy,
} from "passport-jwt";


import {
  PrismaService,
} from "../../prisma/prisma.service";



interface JwtPayload {

  id:string;

  email:string;

  role:string;

  verified:boolean;

}



@Injectable()

export class JwtStrategy extends PassportStrategy(
  Strategy
) {



constructor(

  private readonly configService:ConfigService,

  private readonly prisma:PrismaService,

){



super({

 jwtFromRequest:
 ExtractJwt.fromAuthHeaderAsBearerToken(),



 ignoreExpiration:false,



 secretOrKey:
 configService.getOrThrow<string>(
   "JWT_SECRET"
 ),


});


}







async validate(
 payload:JwtPayload,
){



const user =
await this.prisma.user.findUnique({

 where:{
   id:payload.id,
 },

});





if(!user){

 throw new UnauthorizedException(
   "User no longer exists"
 );

}





if(!user.active){

 throw new UnauthorizedException(
   "Account disabled"
 );

}






return {

 id:user.id,

 email:user.email,

 role:user.role,

 verified:user.verified,

};



}


}