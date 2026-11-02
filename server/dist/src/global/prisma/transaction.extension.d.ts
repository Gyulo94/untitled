import { TransactionOptions } from "..";
export declare const createTransactionExtension: (options?: TransactionOptions) => (client: any) => {
    $extends: {
        extArgs: {
            result: {};
            model: {};
            query: {};
            client: {};
        };
    };
};
