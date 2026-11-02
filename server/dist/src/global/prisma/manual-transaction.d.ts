import { Prisma } from '@prisma/client';
type Commit = () => void;
type Rollback = (error: any) => void;
export declare class ManualTransaction {
    private readonly transaction;
    private _commit?;
    private _rollback?;
    private _waiter?;
    constructor(transaction: Prisma.TransactionClient);
    get client(): Prisma.TransactionClient;
    setTransaction(commit: Commit, rollback: Rollback): void;
    commit(): Promise<void>;
    rollback(error: any): Promise<void>;
    setWaiter(waiter: any): Promise<void>;
}
export {};
