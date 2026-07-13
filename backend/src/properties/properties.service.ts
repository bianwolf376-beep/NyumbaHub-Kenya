import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";

import {
  PrismaService,
} from "../prisma/prisma.service";


import {
  SupabaseService,
} from "../supabase/supabase.service";


import {
  Prisma,
  PropertyStatus,
} from "@prisma/client";


import {
  Express,
} from "express";


import {
  CreatePropertyDto,
} from "./dto/create-property.dto";


import {
  UpdatePropertyDto,
} from "./dto/update-property.dto";


import {
  FilterPropertyDto,
} from "./dto/filter-property.dto";




@Injectable()
export class PropertiesService {



constructor(

 private readonly prisma:PrismaService,

 private readonly supabaseService:SupabaseService,

){}









async create(

 dto:CreatePropertyDto,

 landlordId:string,

){



return this.prisma.property.create({

data:{


 ...dto,


 landlordId,


 status:
 PropertyStatus.AVAILABLE,


},



include:{


images:true,


landlord:{


select:{


id:true,

fullName:true,

phone:true,

email:true,

verified:true,


},


},


},


});


}









async uploadImages(

 propertyId:string,

 files:Express.Multer.File[],

 landlordId:string,

){



const property =
await this.findOne(propertyId);





if(property.landlord.id !== landlordId){


throw new BadRequestException(

"You cannot upload images for this property"

);


}







const existingImages =
await this.prisma.propertyImage.count({

where:{
propertyId,
},


});






if(existingImages + files.length > 6){


throw new BadRequestException(

"Maximum of 6 images allowed per property"

);


}








const imageUrls =
await this.supabaseService.uploadImages(

files,

`properties/${propertyId}`

);






await this.prisma.propertyImage.createMany({

data:

imageUrls.map((url)=>({


propertyId,


imageUrl:url,


})),


});







return this.findOne(propertyId);



}









async findAll(

filters:FilterPropertyDto,

){



const where:Prisma.PropertyWhereInput = {};






if(filters.county){


where.county={


contains:filters.county,


mode:"insensitive",


};


}







if(filters.town){


where.town={


contains:filters.town,


mode:"insensitive",


};


}







if(filters.estate){


where.estate={


contains:filters.estate,


mode:"insensitive",


};


}







if(filters.propertyType){


where.propertyType =
filters.propertyType;


}








if(filters.bedrooms){


where.bedrooms =
Number(filters.bedrooms);


}







if(filters.bathrooms){


where.bathrooms =
Number(filters.bathrooms);


}







if(
filters.minRent ||
filters.maxRent
){



where.rent={};



if(filters.minRent){


where.rent.gte =
new Prisma.Decimal(
filters.minRent
);


}



if(filters.maxRent){


where.rent.lte =
new Prisma.Decimal(
filters.maxRent
);


}



}







if(filters.parking !== undefined){

  where.parking =
    filters.parking;

}



if(filters.furnished !== undefined){

  where.furnished =
    filters.furnished;

}



if(filters.wifi !== undefined){

  where.wifi =
    filters.wifi;

}



if(filters.security !== undefined){

  where.security =
    filters.security;

}







const properties =
await this.prisma.property.findMany({

where,



include:{


images:true,


landlord:{


select:{


id:true,

fullName:true,

phone:true,

verified:true,


},


},


},



orderBy:{


createdAt:"desc",


},



});







return properties.map(
(property)=>({


...property,


rent:Number(property.rent),


deposit:Number(property.deposit),


})

);



}









async findMine(

landlordId:string,

){



const properties =
await this.prisma.property.findMany({

where:{


landlordId,


},



include:{


images:true,


landlord:{


select:{


id:true,

fullName:true,

phone:true,

verified:true,


},


},


},



orderBy:{


createdAt:"desc",


},



});







return properties.map(
(property)=>({


...property,


rent:Number(property.rent),


deposit:Number(property.deposit),


})

);



}









async findOne(

id:string,

){



const property =
await this.prisma.property.findUnique({

where:{


id,


},



include:{


images:true,


reviews:true,


landlord:{


select:{


id:true,

fullName:true,

phone:true,

email:true,

verified:true,


},


},


},


});







if(!property){


throw new NotFoundException(

"Property not found"

);


}








return {


...property,


rent:Number(property.rent),


deposit:Number(property.deposit),


};


}









async update(

id:string,

dto:UpdatePropertyDto,

landlordId:string,

){



const property =
await this.findOne(id);






if(property.landlord.id !== landlordId){


throw new BadRequestException(

"You cannot edit this property"

);


}







return this.prisma.property.update({

where:{


id,


},



data:dto,



});


}









async remove(

id:string,

landlordId:string,

){



const property =
await this.findOne(id);







if(property.landlord.id !== landlordId){


throw new BadRequestException(

"You cannot delete this property"

);


}







if(property.images.length){



for(const image of property.images){


await this.supabaseService.deleteImage(

image.imageUrl

);


}



await this.prisma.propertyImage.deleteMany({

where:{


propertyId:id,


},


});


}







return this.prisma.property.delete({

where:{


id,


},


});


}



}