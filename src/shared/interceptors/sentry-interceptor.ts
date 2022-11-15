import {
  ExecutionContext,
  Injectable,
  NestInterceptor,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as Sentry from '@sentry/minimal';

/**
 * It intercepts each incoming request and captures all the errors that occur and adds them in sentry logs.
 */
@Injectable()
export class SentryInterceptor implements NestInterceptor {
  /**
   * it is called for each request and it captures the errors and sends it to sentry.
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap(null, (exception) => {
        Sentry.captureException(exception);
      }),
    );
  }
}
