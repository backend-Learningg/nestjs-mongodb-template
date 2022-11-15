/**
 * this exception filter will automatically handle all cases of error.
 *
 * AllExceptionsFilter class have defined globally as provider thus re-importing not require while using.
 */

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

/**
 * It is responsible for processing all unhandled exceptions across an application.
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  /**
   *
   * @param exception caught exception
   * @param host alows retrieving arguments passed to a handler.
   */
  catch(exception: unknown, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.

    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const errorMsg =
      exception instanceof HttpException
        ? exception.message
        : exception instanceof Error
        ? exception.message
        : HttpStatus['500'].split('_').join(' ');
    const responseBody = {
      statusCode: httpStatus,
      message: errorMsg,
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };
    this.logger.error(exception); //logger
    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
