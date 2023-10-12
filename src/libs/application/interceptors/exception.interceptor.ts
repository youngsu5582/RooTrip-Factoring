import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ExceptionBase } from '@src/libs/exceptions/exception.base';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    if (exception instanceof ExceptionBase) {
      const data = exception.toJSON();
      httpAdapter.reply(ctx.getResponse(), data, 400);
    } else if (exception instanceof HttpException) {
      const status = exception.getStatus();
      httpAdapter.reply(ctx.getResponse(), exception, status);
    }
  }
}
