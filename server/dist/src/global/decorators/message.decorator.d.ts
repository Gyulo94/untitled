import { ResponseMessage } from '../enums/response-message.enum';
export declare const SUCCESS_MESSAGE_METADATA = "success_message";
export declare const Message: (message: ResponseMessage) => import("@nestjs/common").CustomDecorator<string>;
