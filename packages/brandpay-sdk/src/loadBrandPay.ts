import type { BrandpayConstructor, BrandPayInstance as BrandpayInstance } from '@tosspayments/brandpay__types';
import { loadScript } from '@tosspayments/sdk-loader';
import { SCRIPT_URL } from './constants';

type BrandpayParams = Parameters<BrandpayConstructor>;

interface LoadOptions {
  src?: string;
  network?: 'high' | 'low' | 'auto';
}

export function loadBrandPay(
  clientKey: BrandpayParams[0],
  customerKey: BrandpayParams[1],
  options: BrandpayParams[2] = {},
  loadOptions: LoadOptions = {},
): Promise<BrandpayInstance> {
  const { src = SCRIPT_URL, network } = loadOptions;

  if (typeof window === 'undefined') {
    // XXX(@HyunSeob): SSR할 때 생성자가 사용되는 경우 에러를 발생시키지 않는대신 정상적인 인스턴스를 반환하지 않는다.
    return Promise.resolve({} as BrandpayInstance);
  }

  // regenerator-runtime 의존성을 없애기 위해 `async` 키워드를 사용하지 않는다
  return loadScript<BrandpayConstructor>(src, 'BrandPay', { priority: network }).then((Brandpay) => {
    return Brandpay(clientKey, customerKey, options);
  });
}
