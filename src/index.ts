///<reference path='../types/index.d.ts' />

import { TossPaymentsInstance } from '../types';

const SCRIPT_URL = '//web.tosspayments.com/sdk/v1/tosspayments.js';

let cachedPromise: Promise<any> | undefined;

export async function loadTossPayments(clientKey: string): Promise<TossPaymentsInstance | null> {
  // SSR 지원
  if (typeof window === 'undefined') {
    return null;
  }

  const selectedScript = document.querySelector(`script[src="${SCRIPT_URL}"]`);

  if (selectedScript != null && cachedPromise !== undefined) {
    return cachedPromise;
  }

  if (selectedScript != null && window.TossPayments !== undefined) {
    return window.TossPayments(clientKey);
  }

  const script = document.createElement('script');
  script.src = SCRIPT_URL;

  cachedPromise = new Promise((resolve, reject) => {
    document.head.appendChild(script);

    window.addEventListener('tossPaymentsInitialize', () => {
      if (window.TossPayments !== undefined) {
        resolve(window.TossPayments(clientKey));
      } else {
        reject(new Error('[TossPayments] Instance 초기화에 실패했습니다.'));
      }
    });
  });

  return cachedPromise;
}
