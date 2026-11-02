import { TransactionOptions } from "..";
import { ManualTransaction } from './manual-transaction';
export declare function extractTransaction(prisma: any, options: TransactionOptions): Promise<ManualTransaction>;
