import {
  createParamDecorator,
  ExecutionContext,
} from "@nestjs/common";

import {
  Request,
} from "express";

import {
  UserRole,
} from "@prisma/client";



interface AuthenticatedRequest extends Request {

  user: {

    id:string;

    email:string;

    role:UserRole;

    verified:boolean;

  };

}





export const CurrentUser =
createParamDecorator(

  (
    _data:unknown,

    ctx:ExecutionContext,

  ) => {


    const request =
      ctx
      .switchToHttp()
      .getRequest<AuthenticatedRequest>();


    return request.user;


  },

);