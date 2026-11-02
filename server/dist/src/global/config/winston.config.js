"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.winstonLogger = void 0;
const date_fns_tz_1 = require("date-fns-tz");
const nest_winston_1 = require("nest-winston");
const winston_1 = __importDefault(require("winston"));
const constants_1 = require("../constants");
const appendTimestamp = winston_1.default.format((info, opts) => {
    const tz = opts?.tz;
    if (tz) {
        info.timestamp = (0, date_fns_tz_1.formatInTimeZone)(new Date(), tz, 'yyyy-MM-dd HH:mm:ss');
    }
    return info;
});
exports.winstonLogger = nest_winston_1.WinstonModule.createLogger({
    format: winston_1.default.format.combine(appendTimestamp({ tz: 'Asia/Seoul' }), winston_1.default.format.json(), process.env.NODE_ENV !== 'production'
        ? winston_1.default.format.colorize({ all: true })
        : winston_1.default.format.uncolorize(), winston_1.default.format.printf((info) => {
        const stack = info.stack || info.trace ? `\n${info.stack || info.trace}` : '';
        return `[${constants_1.APP_NAME}] - ${info.level} [${process.pid}] ${info.timestamp} : ${info.message}${stack}`;
    })),
    transports: [
        new winston_1.default.transports.Console({
            level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
            handleExceptions: true,
            handleRejections: true,
        }),
    ],
});
//# sourceMappingURL=winston.config.js.map