import { Prisma } from '@prisma/client';
export interface TransactionOptions {
    maxWait?: number;
    timeout?: number;
    Level?: Prisma.TransactionIsolationLevel;
}
export declare function Transactional(options?: TransactionOptions): MethodDecorator;
