///<reference path='./tosspayments/index.d.ts' />

import { TossPaymentsConstuctor, TossPaymentsInstance } from '@tosspayments/browser-sdk';

declare module '@tosspayments/loader' {
  export * from '@tosspayments/browser-sdk';
  export function loadTossPayments(clientKey: string): Promise<TossPaymentsInstance | null>;
}

declare global {
  interface Window {
    TossPayments?: TossPaymentsConstuctor;
  }
}
