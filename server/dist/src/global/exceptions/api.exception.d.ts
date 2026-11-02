import { HttpException } from '@nestjs/common';
import { ErrorCode } from '../enums/error-code.enum';
export declare class ApiException extends HttpException {
    private readonly errorCode;
    constructor(errorCode: ErrorCode, description?: string);
    getErrorCode(): ErrorCode;
}
