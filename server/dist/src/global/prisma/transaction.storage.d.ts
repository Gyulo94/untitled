import { ManualTransaction } from './manual-transaction';
import { TransactionOptions } from "..";
type TransactionStorageDataType = {
    manualTx: ManualTransaction | null;
    options: TransactionOptions;
};
declare class LocalStorage<T> {
    private readonly als;
    constructor();
    protected run<R = any>(store: T, callback: () => R | Promise<R>): R | Promise<R>;
    protected get(): T;
    protected set(key: keyof T, value: any): void;
}
declare class TransactionStorage extends LocalStorage<TransactionStorageDataType> {
    initTx<R = any>(options: TransactionOptions, callback: () => Promise<R>): Promise<R>;
    getTx(): TransactionStorageDataType | null;
    setTx(value: ManualTransaction): void;
}
declare const _default: TransactionStorage;
export default _default;
