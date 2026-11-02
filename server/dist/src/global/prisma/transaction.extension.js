"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransactionExtension = void 0;
const client_1 = require("@prisma/client");
const extract_transaction_1 = require("./extract-transaction");
const transaction_storage_1 = __importDefault(require("./transaction.storage"));
const createTransactionExtension = (options) => client_1.Prisma.defineExtension((prisma) => {
    return prisma.$extends({
        query: {
            $allOperations: async ({ args, model, operation, query, __internalParams, }) => {
                const store = transaction_storage_1.default.getTx();
                if (!store || store === null || __internalParams?.transaction) {
                    return query(args);
                }
                if (store.manualTx === null) {
                    const manualTx = await (0, extract_transaction_1.extractTransaction)(prisma, store.options || options);
                    transaction_storage_1.default.setTx(manualTx);
                }
                const updatedStore = transaction_storage_1.default.getTx();
                if (!updatedStore) {
                    throw new Error('트랜잭션 저장소가 올바르게 초기화되지 않았습니다.');
                }
                if (model) {
                    if (!updatedStore.manualTx || !updatedStore.manualTx.client) {
                        throw new Error('수동 트랜잭션 클라이언트가 설정되지 않았습니다. 트랜잭션이 올바르게 초기화되었는지 확인하세요."');
                    }
                    if (!updatedStore.manualTx.client[model]) {
                        throw new Error(`모델 (${model})이 트랜잭션 클라이언트에 존재하지 않습니다.`);
                    }
                    const result = await updatedStore.manualTx.client[model][operation](args);
                    return result;
                }
                if (!updatedStore.manualTx) {
                    throw new Error('수동 트랜잭션이 설정되지 않았습니다.');
                }
                return updatedStore.manualTx.client[operation](args);
            },
        },
    });
});
exports.createTransactionExtension = createTransactionExtension;
//# sourceMappingURL=transaction.extension.js.map