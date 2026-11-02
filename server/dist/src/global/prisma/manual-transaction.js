"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManualTransaction = void 0;
class ManualTransaction {
    transaction;
    _commit;
    _rollback;
    _waiter;
    constructor(transaction) {
        this.transaction = transaction;
    }
    get client() {
        return this.transaction;
    }
    setTransaction(commit, rollback) {
        this._commit = commit;
        this._rollback = rollback;
    }
    async commit() {
        if (!this._commit || typeof this._commit !== 'function')
            throw Error('트랜잭션 커밋이 설정되지 않았습니다.');
        this._commit();
        await this._waiter;
    }
    async rollback(error) {
        if (!this._rollback || typeof this._rollback !== 'function')
            throw Error('트랜잭션 롤백이 설정되지 않았습니다.');
        this._rollback(error);
        await this._waiter;
    }
    async setWaiter(waiter) {
        this._waiter = waiter;
    }
}
exports.ManualTransaction = ManualTransaction;
//# sourceMappingURL=manual-transaction.js.map