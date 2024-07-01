import { loadScript } from '@tosspayments/sdk-loader';
import { SCRIPT_URL } from './constants';
import { TossPayments, TossPaymentsInstance } from '@tosspayments/standard-public-interfaces';

type TosspaymentsParams = Parameters<TossPayments>;

export function loadTossPayments(
  clientKey: TosspaymentsParams[0],
  loadOptions: { src?: string } = {}
): Promise<TossPaymentsInstance> {
  const { src = SCRIPT_URL } = loadOptions;

  if (typeof window === 'undefined') {
    // XXX(@HyunSeob): SSR할 때 생성자가 사용되는 경우 에러를 발생시키지 않는대신 정상적인 인스턴스를 반환하지 않는다.
    return Promise.resolve({} as TossPaymentsInstance);
  }

  // regenerator-runtime 의존성을 없애기 위해 `async` 키워드를 사용하지 않는다
  return loadScript<TossPayments>(src, 'TossPayments').then((TossPayments) => {
    return TossPayments(clientKey);
  });
}
