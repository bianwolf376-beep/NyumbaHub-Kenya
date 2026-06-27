import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
  } from "@nestjs/common";
  
  @Catch()
  export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
  
      const response = ctx.getResponse();
      const request = ctx.getRequest();
  
      const status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
  
      let message = "Internal server error";
  
      if (exception instanceof HttpException) {
        const error = exception.getResponse();
  
        if (typeof error === "string") {
          message = error;
        } else if (
          typeof error === "object" &&
          error !== null &&
          "message" in error
        ) {
          message = Array.isArray((error as any).message)
            ? (error as any).message.join(", ")
            : (error as any).message;
        }
      }
  
      response.status(status).json({
        success: false,
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message,
      });
    }
  }