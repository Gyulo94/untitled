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
exports.RequestMiddleware = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../constants");
let RequestMiddleware = class RequestMiddleware {
    logger;
    constructor(logger) {
        this.logger = logger;
    }
    use(req, res, next) {
        if (constants_1.NODE_ENV === 'development') {
            this.logger.log(JSON.stringify({
                url: req.url,
                method: req.method,
                body: req.body,
            }));
        }
        else {
            this.logger.log(JSON.stringify({
                url: req.url,
                method: req.method,
                ip: req.ip,
            }));
        }
        next();
    }
};
exports.RequestMiddleware = RequestMiddleware;
exports.RequestMiddleware = RequestMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [common_1.Logger])
], RequestMiddleware);
//# sourceMappingURL=logger.middleware.js.map