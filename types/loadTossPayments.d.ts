import { TossPaymentsInstance } from '@tosspayments/sdk-types';
export declare function loadTossPayments(clientKey: string, { src }?: {
    src?: string;
}): Promise<TossPaymentsInstance>;
