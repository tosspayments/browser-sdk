import { TossPaymentsInstance } from '@tosspayments/sdk-types';

const SCRIPT_URL = 'https://js.tosspayments.com/v1';

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

  const selectedScript = document.querySelector(`script[src="${src}"]`);

  if (selectedScript != null && cachedPromise !== undefined) {
    return cachedPromise;
  }

  if (selectedScript != null && window.TossPayments !== undefined) {
    return Promise.resolve(window.TossPayments(clientKey));
  }

  const script = document.createElement('script');
  script.src = src;

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

export { TossPaymentsInstance };
