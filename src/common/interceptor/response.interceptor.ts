import {
  CallHandler,
  ExecutionContext,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { responseSuccess } from '../helpers/response.helper';

export class ResponseInterceptor implements NestInterceptor {
  private readonly logger = new Logger();
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => {
        console.log({ data });
        const res = responseSuccess(data);
        return res;
      }),
    );
  }
}
