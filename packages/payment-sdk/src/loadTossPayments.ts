import { TossPaymentsInstance } from '@tosspayments/payment__types';
import { SCRIPT_ID, SCRIPT_URL } from './constants';

let cachedPromise: Promise<TossPaymentsInstance> | undefined;

export function loadTossPayments(
  clientKey: string,
  { src = SCRIPT_URL }: { src?: string } = {}
): Promise<TossPaymentsInstance> {
  // SSR 지원
  if (typeof window === 'undefined') {
    return Promise.resolve({
      requestPayment() {
        throw new Error('[TossPayments.js] 서버에서는 실행할 수 없습니다.');
      },
      requestBillingAuth() {
        throw new Error('[TossPayments.js] 서버에서는 실행할 수 없습니다.');
      },
    });
  }

  const existingScript = document.getElementById(SCRIPT_ID);

  if (existingScript != null && cachedPromise !== undefined) {
    return cachedPromise;
  }

  if (existingScript != null && window.TossPayments !== undefined) {
    return Promise.resolve(window.TossPayments(clientKey));
  }

  const script = document.createElement('script');
  script.src = src;
  script.id = SCRIPT_ID;

  cachedPromise = new Promise((resolve, reject) => {
    document.head.appendChild(script);

    window.addEventListener('tossPaymentsInitialize', () => {
      if (window.TossPayments !== undefined) {
        resolve(window.TossPayments(clientKey));
      } else {
        reject(new Error('[TossPayments.js] 인스턴스 초기화에 실패했습니다.'));
      }
    });
  });

  return cachedPromise;
}

// test
