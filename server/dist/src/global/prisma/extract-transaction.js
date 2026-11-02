"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractTransaction = extractTransaction;
const manual_transaction_1 = require("./manual-transaction");
async function extractTransaction(prisma, options) {
    let waiter;
    const instance = await new Promise((resolveInstance) => {
        waiter = prisma.$transaction(async (tx) => {
            const transaction = new manual_transaction_1.ManualTransaction(tx);
            resolveInstance(transaction);
            await new Promise((resolve, reject) => transaction.setTransaction(() => resolve(), (error) => reject(error)));
        }, options);
    });
    instance.setWaiter(waiter);
    return instance;
}
//# sourceMappingURL=extract-transaction.js.map