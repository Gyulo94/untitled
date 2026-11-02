import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
import type { LoggerService } from '@nestjs/common';
export declare class HttpExceptionFilter implements ExceptionFilter {
    private readonly logger;
    constructor(logger: LoggerService);
    catch(exception: HttpException, host: ArgumentsHost): void;
}
