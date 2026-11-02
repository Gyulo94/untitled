import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { format } from 'date-fns';
import type { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SUCCESS_MESSAGE_METADATA } from '../decorators/message.decorator';
import { ApiSuccess } from './api.interface';

const DEFAULT_MESSAGE = '성공';

@Injectable()
export class ApiInterceptor<T> implements NestInterceptor<T, ApiSuccess<T>> {
  constructor(private readonly reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<ApiSuccess<T>> {
    if (context.getType() !== 'http') {
      return next.handle() as Observable<ApiSuccess<T>>;
    }

    const http = context.switchToHttp();
    const request = http.getRequest<Request>();
    const response = http.getResponse<Response>();
    const staticMessage = this.reflector.get<string | undefined>(
      SUCCESS_MESSAGE_METADATA,
      context.getHandler(),
    );

    return next.handle().pipe(
      map((payload) => {
        const { message, body } = this.unwrap(payload, staticMessage);

        return {
          statusCode: response.statusCode || HttpStatus.OK,
          method: request.method,
          path: request.url,
          message,
          body,
          timestamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        };
      }),
    );
  }

  private unwrap(
    payload: T,
    staticMessage = DEFAULT_MESSAGE,
  ): { message: string; body: T | null } {
    if (typeof payload === 'string') {
      return { message: payload, body: null };
    }

    if (
      payload &&
      typeof payload === 'object' &&
      'message' in payload &&
      typeof payload.message === 'string'
    ) {
      const body = 'body' in payload ? ((payload.body as T) ?? null) : payload;
      return { message: payload.message, body };
    }

    return { message: staticMessage, body: payload };
  }
}
