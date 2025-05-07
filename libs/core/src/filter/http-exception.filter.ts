import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
  Provider,
} from '@nestjs/common'
import { APP_FILTER } from '@nestjs/core'
import { Request, Response } from 'express'

@Catch()
class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('HTTP_EXCEPTION')

  catch(exception: unknown, host: ArgumentsHost) {
    if (host.getType() !== 'http') return

    const ctx = host.switchToHttp()
    const request = ctx.getRequest<Request>()
    const response = ctx.getResponse<Response>()

    const error = this.handleException(exception)

    this.logger.error(
      `Method: ${request.method}; Path: ${request.originalUrl}; Code: ${error.code}; Error: ${error.message}; IP: ${request.clientIp}`,
    )

    const status = Object.values(HttpStatus).includes(error.code)
      ? error.code
      : HttpStatus.BAD_REQUEST
    return response.status(status).send(error)
  }

  private handleException(exception: unknown) {
    if (exception instanceof HttpException) {
      return {
        code: exception.getStatus(),
        message: (exception.getResponse() as any)?.error || exception.message,
      }
    }

    return {
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
    }
  }
}

export const APP_HTTP_EXCEPTION_FILTER: Provider = {
  provide: APP_FILTER,
  useClass: HttpExceptionFilter,
}
