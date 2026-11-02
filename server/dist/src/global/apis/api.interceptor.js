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
exports.ApiInterceptor = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const date_fns_1 = require("date-fns");
const operators_1 = require("rxjs/operators");
const message_decorator_1 = require("../decorators/message.decorator");
const DEFAULT_MESSAGE = '성공';
let ApiInterceptor = class ApiInterceptor {
    reflector;
    constructor(reflector) {
        this.reflector = reflector;
    }
    intercept(context, next) {
        if (context.getType() !== 'http') {
            return next.handle();
        }
        const http = context.switchToHttp();
        const request = http.getRequest();
        const response = http.getResponse();
        const staticMessage = this.reflector.get(message_decorator_1.SUCCESS_MESSAGE_METADATA, context.getHandler());
        return next.handle().pipe((0, operators_1.map)((payload) => {
            const { message, body } = this.unwrap(payload, staticMessage);
            return {
                statusCode: response.statusCode || common_1.HttpStatus.OK,
                method: request.method,
                path: request.url,
                message,
                body,
                timestamp: (0, date_fns_1.format)(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            };
        }));
    }
    unwrap(payload, staticMessage = DEFAULT_MESSAGE) {
        if (typeof payload === 'string') {
            return { message: payload, body: null };
        }
        if (payload &&
            typeof payload === 'object' &&
            'message' in payload &&
            typeof payload.message === 'string') {
            const body = 'body' in payload ? (payload.body ?? null) : payload;
            return { message: payload.message, body };
        }
        return { message: staticMessage, body: payload };
    }
};
exports.ApiInterceptor = ApiInterceptor;
exports.ApiInterceptor = ApiInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], ApiInterceptor);
//# sourceMappingURL=api.interceptor.js.map