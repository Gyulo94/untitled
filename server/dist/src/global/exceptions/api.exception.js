"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiException = void 0;
const common_1 = require("@nestjs/common");
const error_code_enum_1 = require("../enums/error-code.enum");
class ApiException extends common_1.HttpException {
    errorCode;
    constructor(errorCode, description) {
        const errorDetail = error_code_enum_1.ErrorCodeMap[errorCode];
        if (!errorDetail) {
            super('알 수 없는 에러가 발생했습니다.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            this.errorCode = error_code_enum_1.ErrorCode.INTERNAL_SERVER_ERROR;
        }
        else {
            super(description || errorDetail.message, errorDetail.status);
            this.errorCode = errorCode;
        }
    }
    getErrorCode() {
        return this.errorCode;
    }
}
exports.ApiException = ApiException;
//# sourceMappingURL=api.exception.js.map