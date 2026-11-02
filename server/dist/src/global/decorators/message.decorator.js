"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = exports.SUCCESS_MESSAGE_METADATA = void 0;
const common_1 = require("@nestjs/common");
exports.SUCCESS_MESSAGE_METADATA = 'success_message';
const Message = (message) => (0, common_1.SetMetadata)(exports.SUCCESS_MESSAGE_METADATA, message);
exports.Message = Message;
//# sourceMappingURL=message.decorator.js.map