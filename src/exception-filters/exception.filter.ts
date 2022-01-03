import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { Request, Response } from "express";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost){}

    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        // const request = ctx.getRequest<Request>();
        // const response = ctx.getResponse<Response>();
        const {httpAdapter} = this.httpAdapterHost;
        const httpStatus = exception instanceof HttpException? exception.getStatus(): HttpStatus.INTERNAL_SERVER_ERROR;

        const responseBody = {
            statusCode: httpStatus,
            timeStamp: new Date().toISOString(),
            path: httpAdapter.getRequestUrl(ctx.getRequest()),
            message: httpStatus===400?exception.response.message: exception.message

        };

        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
}