import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";


import {
  FilesInterceptor,
} from "@nestjs/platform-express";


import {
  ApiBearerAuth,
} from "@nestjs/swagger";


import {
  UserRole,
} from "@prisma/client";


import {
  CurrentUser,
} from "../auth/decorators/current-user.decorator";


import {
  Roles,
} from "../auth/decorators/roles.decorator";


import {
  JwtAuthGuard,
} from "../auth/guards/jwt-auth.guard";


import {
  RolesGuard,
} from "../auth/guards/roles.guard";


import {
  CreatePropertyDto,
} from "./dto/create-property.dto";


import {
  FilterPropertyDto,
} from "./dto/filter-property.dto";


import {
  UpdatePropertyDto,
} from "./dto/update-property.dto";


import {
  PropertiesService,
} from "./properties.service";




interface JwtUser {

 id:string;

 email:string;

 role:UserRole;

 verified:boolean;

}





@ApiBearerAuth("access-token")

@Controller("properties")

export class PropertiesController {



constructor(
 private readonly propertiesService:PropertiesService,
){}






// CREATE PROPERTY

@Post()

@UseGuards(
 JwtAuthGuard,
 RolesGuard,
)

@Roles(
 UserRole.LANDLORD
)

async create(

 @Body()
 dto:CreatePropertyDto,


 @CurrentUser()
 user:JwtUser,

){


 return this.propertiesService.create(
   dto,
   user.id,
 );


}









// UPLOAD IMAGES

@Post(":id/images")

@UseGuards(
 JwtAuthGuard,
 RolesGuard,
)

@Roles(
 UserRole.LANDLORD
)

@UseInterceptors(
 FilesInterceptor(
  "images",
  6,
 )
)

async uploadImages(

 @Param("id")
 id:string,


 @UploadedFiles()
 files:Express.Multer.File[],


 @CurrentUser()
 user:JwtUser,

){


 return this.propertiesService.uploadImages(
   id,
   files,
   user.id,
 );


}









// LANDLORD PROPERTIES

@Get("my-properties")

@UseGuards(
 JwtAuthGuard,
 RolesGuard,
)

@Roles(
 UserRole.LANDLORD
)

async findMine(

 @CurrentUser()
 user:JwtUser,

){


 return this.propertiesService.findMine(
   user.id,
 );


}









// PUBLIC SEARCH

@Get()

async findAll(

 @Query()
 filters:FilterPropertyDto,

){


 return this.propertiesService.findAll(
   filters,
 );


}









// SINGLE PROPERTY

@Get(":id")

async findOne(

 @Param("id")
 id:string,

){


 return this.propertiesService.findOne(
   id,
 );


}









// UPDATE PROPERTY

@Patch(":id")

@UseGuards(
 JwtAuthGuard,
 RolesGuard,
)

@Roles(
 UserRole.LANDLORD
)

async update(

 @Param("id")
 id:string,


 @Body()
 dto:UpdatePropertyDto,


 @CurrentUser()
 user:JwtUser,

){


 return this.propertiesService.update(
   id,
   dto,
   user.id,
 );


}









// DELETE PROPERTY

@Delete(":id")

@UseGuards(
 JwtAuthGuard,
 RolesGuard,
)

@Roles(
 UserRole.LANDLORD
)

async remove(

 @Param("id")
 id:string,


 @CurrentUser()
 user:JwtUser,

){


 return this.propertiesService.remove(
   id,
   user.id,
 );


}



}