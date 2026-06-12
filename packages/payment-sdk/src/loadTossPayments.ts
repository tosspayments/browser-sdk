import { TossPaymentsInstance, TossPaymentsConstructor } from '@tosspayments/payment__types';
import { loadScript } from '@tosspayments/sdk-loader';
import { SCRIPT_URL } from './constants';

const NAMESPACE = 'TossPayments';

// loadTossPayments 가 시도한 (src, namespace) 를 모듈 내부에 추적하여, clearTossPayments 가
// 호출 시점에 정확히 동일한 스크립트와 sdk-loader 의 cache entry 를 정리할 수 있도록 합니다.
// key 는 src 만 사용 (namespace 는 현재 고정), 같은 src 의 중복 load 는 자연스럽게 dedupe 됩니다.
export const loadedRequests = new Map<string, { src: string; namespace: string }>();

export function loadTossPayments(
  clientKey: string,
  { src = SCRIPT_URL }: { src?: string } = {}
): Promise<TossPaymentsInstance> {
  // SSR 지원
  if (typeof window === 'undefined') {
    return Promise.resolve({
      requestPayment() {
        throw new Error(
          `[TossPayments SDK] It looks like runtime is not from browser. This method is only executable on browser.`
        );
      },
      requestBillingAuth() {
        throw new Error(
          `[TossPayments SDK] It looks like runtime is not from browser. This method is only executable on browser.`
        );
      },
      cancelPayment() {
        throw new Error(
          `[TossPayments SDK] It looks like runtime is not from browser. This method is only executable on browser.`
        );
      },
    });
  }

  loadedRequests.set(src, { src, namespace: NAMESPACE });

  // regenerator-runtime 의존성을 없애기 위해 `async` 키워드를 사용하지 않는다
  return loadScript<TossPaymentsConstructor>(src, NAMESPACE).then((TossPayments) => {
    return TossPayments(clientKey);
  });
}
