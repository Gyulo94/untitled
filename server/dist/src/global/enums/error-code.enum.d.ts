import { HttpStatus } from '@nestjs/common';
export declare enum ErrorCode {
    INTERNAL_SERVER_ERROR = "SERVER_001",
    BAD_REQUEST = "COMMON_001",
    FORBIDDEN = "COMMON_002",
    UNAUTHORIZED = "COMMON_003",
    INVALID_DATE_RANGE = "COMMON_004"
}
export declare const ErrorCodeMap: Record<ErrorCode, {
    status: HttpStatus;
    message: string;
}>;
