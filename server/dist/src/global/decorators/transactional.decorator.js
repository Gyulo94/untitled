"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transactional = Transactional;
const transaction_storage_1 = __importDefault(require("../prisma/transaction.storage"));
function Transactional(options) {
    return ((_, propertyKey, descriptor) => {
        const originalFn = descriptor.value;
        if (typeof originalFn !== 'function') {
            throw new Error(`@Transactional 데코레이터는 오직 함수(메서드)에만 사용될 수 있습니다. 하지만 (${propertyKey.toString()})는 함수가 아닙니다.`);
        }
        descriptor.value = async function (...args) {
            const existingStore = transaction_storage_1.default.getTx();
            if (existingStore?.manualTx) {
                return originalFn.apply(this, args);
            }
            return transaction_storage_1.default.initTx(options || {}, async () => {
                try {
                    const result = await originalFn.apply(this, args);
                    const store = transaction_storage_1.default.getTx();
                    if (store?.manualTx) {
                        await store.manualTx.commit();
                    }
                    return result;
                }
                catch (error) {
                    const store = transaction_storage_1.default.getTx();
                    if (store?.manualTx) {
                        await store.manualTx.rollback(error);
                    }
                    throw error;
                }
            });
        };
        function copyMethodMetadata(from, to) {
            const metadataKeys = Reflect.getMetadataKeys(from);
            metadataKeys.map((key) => {
                const value = Reflect.getMetadata(key, from);
                Reflect.defineMetadata(key, value, to);
            });
        }
        copyMethodMetadata(originalFn, descriptor.value);
    });
}
//# sourceMappingURL=transactional.decorator.js.map