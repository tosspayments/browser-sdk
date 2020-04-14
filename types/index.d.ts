///<reference path='./tosspayments/index.d.ts' />

import { TossPaymentsConstuctor, TossPaymentsInstance } from '@tossteam/payments-web';

declare module '@tossteam/payments-web' {
  export * from '@tossteam/payments-web';
  export function loadTossPayments(clientKey: string): Promise<TossPaymentsInstance | null>;
}

declare global {
  interface Window {
    TossPayments?: TossPaymentsConstuctor;
  }
}
