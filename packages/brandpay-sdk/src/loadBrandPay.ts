import type { BrandPayConstructor, BrandPayInstance } from '@tosspayments/brandpay__types';
import { loadScript } from '@tosspayments/sdk-loader';
import { SCRIPT_ID, SCRIPT_URL } from './constants';

type BrandPayParams = Parameters<BrandPayConstructor>;

export function loadBrandPay(
  clientKey: BrandPayParams[0],
  customerKey: BrandPayParams[1],
  options: BrandPayParams[2] = {},
  loadOptions: { src?: string } = {}
): Promise<BrandPayInstance> {
  const { src = SCRIPT_URL } = loadOptions;

  if (typeof window === 'undefined') {
    // XXX(@HyunSeob): SSR할 때 생성자가 사용되는 경우 에러를 발생시키지 않는대신 정상적인 인스턴스를 반환하지 않는다.
    return Promise.resolve({} as BrandPayInstance);
  }

  // regenerator-runtime 의존성을 없애기 위해 `async` 키워드를 사용하지 않는다
  return loadScript<BrandPayConstructor>(src, 'BrandPay', SCRIPT_ID).then((BrandPay) => {
    return BrandPay(clientKey, customerKey, options);
  });
}
