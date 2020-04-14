import TossPayments from './tosspayments';

export type TossPaymentsConstuctor = typeof TossPayments;
export type TossPaymentsInstance = ReturnType<TossPaymentsConstuctor>;

export function loadTossPayments(clientKey: string): Promise<TossPaymentsInstance | null>;

declare global {
  interface Window {
    TossPayments?: TossPaymentsConstuctor;
  }
}
