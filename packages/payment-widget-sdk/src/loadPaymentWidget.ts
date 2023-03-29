import type {
  PaymentWidgetConstructor,
  PaymentWidgetInstance,
} from '@tosspayments/payment-widget__types';
import { loadScript } from '@tosspayments/sdk-loader';
import { SCRIPT_URL } from './constants';

type PaymentWidgetParams = Parameters<PaymentWidgetConstructor>;

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

  // regenerator-runtime 의존성을 없애기 위해 `async` 키워드를 사용하지 않는다
  return loadScript<PaymentWidgetConstructor>(src, 'PaymentWidget').then((PaymentWidget) => {
    return PaymentWidget(clientKey, customerKey, options);
  });
}
