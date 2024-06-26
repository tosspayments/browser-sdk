import { SCRIPT_URL } from './constants';
import type { TossPayments } from '@tosspayments/standard-public-interfaces';

declare global {
  interface Window {
    TossPayments?: TossPayments & { version: string; isV2: boolean; ANONYMOUS: string };
  }
}

export function clearPaymentWidget() {
  const script = document.querySelector(`script[src="${SCRIPT_URL}"]`);

  script?.parentElement?.removeChild(script);
  window.TossPayments = undefined;
}
