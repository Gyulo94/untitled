import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ApiSuccess } from './api.interface';
export declare class ApiInterceptor<T> implements NestInterceptor<T, ApiSuccess<T>> {
    private readonly reflector;
    constructor(reflector: Reflector);
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<ApiSuccess<T>>;
    private unwrap;
}
