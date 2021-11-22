import { TossPaymentsInstance, TossPaymentsConstructor } from '@tosspayments/payment__types';
import { loadScript } from '@tosspayments/sdk-loader';
import { SCRIPT_URL } from './constants';

export function loadTossPayments(
  clientKey: string,
  { src = SCRIPT_URL }: { src?: string } = {}
): Promise<TossPaymentsInstance> {
  // SSR 지원
  if (typeof window === 'undefined') {
    return Promise.resolve({
      requestPayment() {
        throw new Error(`[TossPayments SDK] Can't execute method on server.`);
      },
      requestBillingAuth() {
        throw new Error(`[TossPayments SDK] Can't execute method on server.`);
      },
    });
  }

  // regenerator-runtime 의존성을 없애기 위해 `async` 키워드를 사용하지 않는다
  return loadScript<TossPaymentsConstructor>(src, 'TossPayments').then((TossPayments) => {
    return TossPayments(clientKey);
  });
}
