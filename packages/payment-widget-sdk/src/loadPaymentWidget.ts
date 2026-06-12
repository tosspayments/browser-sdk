import type {
  PaymentWidgetConstructor,
  PaymentWidgetInstance,
} from '@tosspayments/payment-widget__types';
import { loadScript } from '@tosspayments/sdk-loader';
import { SCRIPT_URL } from './constants';

type PaymentWidgetParams = Parameters<PaymentWidgetConstructor>;

const NAMESPACE = 'PaymentWidget';

// loadPaymentWidget 가 시도한 (src, namespace) 를 모듈 내부에 추적하여, clearPaymentWidget 가
// 호출 시점에 정확히 동일한 스크립트와 sdk-loader 의 cache entry 를 정리할 수 있도록 합니다.
// key 는 src 만 사용 (namespace 는 현재 고정), 같은 src 의 중복 load 는 자연스럽게 dedupe 됩니다.
export const loadedRequests = new Map<string, { src: string; namespace: string }>();

export function loadPaymentWidget(
  clientKey: PaymentWidgetParams[0],
  customerKey: PaymentWidgetParams[1],
  options?: PaymentWidgetParams[2],
  loadOptions: { src?: string } = {}
): Promise<PaymentWidgetInstance> {
  const { src = SCRIPT_URL } = loadOptions;

  if (typeof window === 'undefined') {
    // XXX(@HyunSeob): SSR할 때 생성자가 사용되는 경우 에러를 발생시키지 않는대신 정상적인 인스턴스를 반환하지 않는다.
    return Promise.resolve({} as PaymentWidgetInstance);
  }

  loadedRequests.set(src, { src, namespace: NAMESPACE });

  // regenerator-runtime 의존성을 없애기 위해 `async` 키워드를 사용하지 않는다
  return loadScript<PaymentWidgetConstructor>(src, NAMESPACE).then((PaymentWidget) => {
    return PaymentWidget(clientKey, customerKey, options);
  });
}
