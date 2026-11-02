"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const error_code_enum_1 = require("../enums/error-code.enum");
const api_exception_1 = require("../exceptions/api.exception");
const date_fns_1 = require("date-fns");
let HttpExceptionFilter = class HttpExceptionFilter {
    logger;
    constructor(logger) {
        this.logger = logger;
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();
        const message = exception.message;
        if (status === common_1.HttpStatus.UNAUTHORIZED ||
            status === common_1.HttpStatus.NOT_FOUND ||
            status === common_1.HttpStatus.CONFLICT ||
            status === common_1.HttpStatus.BAD_REQUEST) {
            this.logger.warn(`[CODE : ${status}] [${request.method} : ${request.url}] / [${message}] `);
        }
        else {
            this.logger.error(`[CODE : ${status}] [${request.method} : ${request.url}] / [${message}] `);
        }
        let responseBody = {
            statusCode: status,
            message: message,
            path: request.url,
            timestamp: (0, date_fns_1.format)(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        };
        if (exception instanceof api_exception_1.ApiException) {
            const customErrorCode = exception.getErrorCode();
            const enumDetail = error_code_enum_1.ErrorCodeMap[customErrorCode];
            responseBody.message =
                message || (enumDetail ? enumDetail.message : '알 수 없는 에러');
            responseBody.code = customErrorCode;
        }
        response.status(status).json(responseBody);
    }
};
exports.HttpExceptionFilter = HttpExceptionFilter;
exports.HttpExceptionFilter = HttpExceptionFilter = __decorate([
    (0, common_1.Catch)(common_1.HttpException),
    __metadata("design:paramtypes", [Object])
], HttpExceptionFilter);
//# sourceMappingURL=http-exception.filter.js.map