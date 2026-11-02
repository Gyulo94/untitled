"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const async_hooks_1 = require("async_hooks");
class LocalStorage {
    als;
    constructor() {
        this.als = new async_hooks_1.AsyncLocalStorage();
        if (!this.als) {
            throw new Error(`async_hooks 모듈에서 AsyncLocalStorage를 찾을 수 없기 때문에 트랜잭션 저장소를 만들 수 없습니다.`);
        }
    }
    run(store, callback) {
        return this.als.run(store, callback);
    }
    get() {
        return this.als.getStore() || {};
    }
    set(key, value) {
        const store = this.get();
        if (store !== null && store !== undefined)
            store[key] = value;
    }
}
class TransactionStorage extends LocalStorage {
    async initTx(options, callback) {
        return this.run({ manualTx: null, options }, callback);
    }
    getTx() {
        const store = this.get();
        return store && Object.keys(store).length > 0 ? store : null;
    }
    setTx(value) {
        const store = this.get();
        if (store !== null && store !== undefined) {
            store.manualTx = value;
        }
        else {
            throw new Error('트랜잭션 저장소가 올바르게 초기화되지 않았습니다.');
        }
    }
}
exports.default = new TransactionStorage();
//# sourceMappingURL=transaction.storage.js.map