"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCodeMap = exports.ErrorCode = void 0;
const common_1 = require("@nestjs/common");
var ErrorCode;
(function (ErrorCode) {
    ErrorCode["INTERNAL_SERVER_ERROR"] = "SERVER_001";
    ErrorCode["BAD_REQUEST"] = "COMMON_001";
    ErrorCode["FORBIDDEN"] = "COMMON_002";
    ErrorCode["UNAUTHORIZED"] = "COMMON_003";
    ErrorCode["INVALID_DATE_RANGE"] = "COMMON_004";
})(ErrorCode || (exports.ErrorCode = ErrorCode = {}));
exports.ErrorCodeMap = {
    [ErrorCode.INTERNAL_SERVER_ERROR]: {
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        message: '서버 내부 오류가 발생했습니다.',
    },
    [ErrorCode.BAD_REQUEST]: {
        status: common_1.HttpStatus.BAD_REQUEST,
        message: '잘못된 요청입니다.',
    },
    [ErrorCode.FORBIDDEN]: {
        status: common_1.HttpStatus.FORBIDDEN,
        message: '접근이 거부되었습니다.',
    },
    [ErrorCode.UNAUTHORIZED]: {
        status: common_1.HttpStatus.UNAUTHORIZED,
        message: '인증이 필요합니다.',
    },
    [ErrorCode.INVALID_DATE_RANGE]: {
        status: common_1.HttpStatus.BAD_REQUEST,
        message: '시작일은 종료일보다 이후일 수 없습니다.',
    },
};
//# sourceMappingURL=error-code.enum.js.map