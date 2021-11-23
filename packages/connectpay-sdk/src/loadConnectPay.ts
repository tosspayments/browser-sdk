import { ConnectPayConstructor, ConnectPayInstance } from '@tosspayments/connectpay__types';
import { loadScript } from '@tosspayments/sdk-loader';
import { SCRIPT_URL } from './constants';

type ConnectPayParams = Parameters<ConnectPayConstructor>;

export function loadConnectPay(
  clientKey: ConnectPayParams[0],
  customerKey: ConnectPayParams[1],
  options: ConnectPayParams[2] = {},
  loadOptions: { src?: string } = {}
): Promise<ConnectPayInstance> {
  const { src = SCRIPT_URL } = loadOptions;

  if (typeof window === 'undefined') {
    // XXX(@HyunSeob): SSR할 때 생성자가 사용되는 경우 에러를 발생시키지 않는대신 정상적인 인스턴스를 반환하지 않는다.
    return Promise.resolve({} as ConnectPayInstance);
  }

  // regenerator-runtime 의 존성을 없애기 위해 `async` 키워드를 사용하지 않는다
  return loadScript<ConnectPayConstructor>(src, 'ConnectPay').then((ConnectPay) => {
    return ConnectPay(clientKey, customerKey, options);
  });
}
