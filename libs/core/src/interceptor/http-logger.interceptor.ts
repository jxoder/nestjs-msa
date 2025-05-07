import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
  Provider,
} from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { Request } from 'express'
import { Observable, tap } from 'rxjs'

@Injectable()
class HTTPLoggerInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP')

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    if (context.getType() !== 'http') return next.handle()

    const st = new Date().getTime()
    const request = context.switchToHttp().getRequest<Request>()

    return next.handle().pipe(
      tap(_ => {
        this.logger.log(
          `Method: ${request.method}, Path: ${request.originalUrl}, Time: ${new Date().getTime() - st}ms, IP: ${request.clientIp}`,
        )
      }),
    )
  }
}

export const APP_HTTP_LOGGER_INTERCEPTOR: Provider = {
  provide: APP_INTERCEPTOR,
  useClass: HTTPLoggerInterceptor,
}
