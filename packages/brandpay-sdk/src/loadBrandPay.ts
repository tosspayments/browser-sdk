import type { BrandpayConstructor, BrandPayInstance as BrandpayInstance } from '@tosspayments/brandpay__types';
import { loadScript } from '@tosspayments/sdk-loader';
import { SCRIPT_URL } from './constants';

type BrandpayParams = Parameters<BrandpayConstructor>;

interface LoadOptions {
  src?: string;
  network?: 'high' | 'low' | 'auto';
}

const NAMESPACE = 'BrandPay';

// loadBrandPay 가 시도한 (src, namespace) 를 모듈 내부에 추적하여, clearBrandPay 가
// 호출 시점에 정확히 동일한 스크립트와 sdk-loader 의 cache entry 를 정리할 수 있도록 합니다.
// key 는 src 만 사용 (namespace 는 현재 고정), 같은 src 의 중복 load 는 자연스럽게 dedupe 됩니다.
export const loadedRequests = new Map<string, { src: string; namespace: string }>();

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

  loadedRequests.set(src, { src, namespace: NAMESPACE });

  // regenerator-runtime 의존성을 없애기 위해 `async` 키워드를 사용하지 않는다
  return loadScript<BrandpayConstructor>(src, NAMESPACE, { priority: network }).then((Brandpay) => {
    return Brandpay(clientKey, customerKey, options);
  });
}
