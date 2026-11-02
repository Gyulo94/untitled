"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const constants_1 = require("./global/constants");
const api_interceptor_1 = require("./global/apis/api.interceptor");
const http_exception_filter_1 = require("./global/filters/http-exception.filter");
const winston_config_1 = require("./global/config/winston.config");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: winston_config_1.winstonLogger,
        bufferLogs: true,
    });
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    const reflector = app.get(core_1.Reflector);
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter(winston_config_1.winstonLogger));
    app.useGlobalInterceptors(new api_interceptor_1.ApiInterceptor(reflector));
    await app.listen(constants_1.PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map