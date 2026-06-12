// `${src}::${namespace}` 조합으로 캐싱하여 서로 다른 src/namespace 가 같은 캐시를 공유하지 않도록 합니다.
// (이전 구현은 module-level 단일 promise라 첫 호출만 기억되어, 두 번째 호출이 다른 src 를 전달해도
//  기존 promise 가 반환되던 문제가 있었습니다.)
const cache = new Map<string, Promise<any>>();

function cacheKey(src: string, namespace: string): string {
  return `${src}::${namespace}`;
}

interface LoadOptions {
  priority?: 'high' | 'low' | 'auto';
}

export function loadScript<Namespace>(src: string, namespace: string, options: LoadOptions = {}): Promise<Namespace> {
  const key = cacheKey(src, namespace);

  // Return the cached Promise if it exists for this src/namespace combination
  const hit = cache.get(key);
  if (hit != null) {
    return hit;
  }

  const promise = new Promise((resolve, reject) => {
    try {
      // Handle SSR
      if (typeof window === 'undefined' || typeof document === 'undefined') {
        return resolve(null);
      }

      // If the SDK instance already exists in the global namespace, resolve with it
      if (getNamespace(namespace) != null) {
        return resolve(getNamespace<Namespace>(namespace));
      }

      // if script exists, but we are reloading due to an error,
      // reload script to trigger 'load' event
      const existingScript = document.querySelector(`script[src="${src}"]`);
      if (existingScript != null) {
        existingScript.removeEventListener('load', onLoad);
        existingScript.removeEventListener('error', onError);
        existingScript.parentElement?.removeChild(existingScript);
      }

      const script = document.createElement('script');
      script.src = src;
      script.addEventListener('load', onLoad);
      script.addEventListener('error', onError);

      if (options.priority != null) {
        (script as any).fetchPriority = options.priority;
      }

      function onLoad() {
        if (getNamespace(namespace) != null) {
          resolve(getNamespace<Namespace>(namespace));
        } else {
          reject(new NamespaceNotAvailableError(namespace));
        }
      }

      function onError() {
        reject(new ScriptLoadFailedError(src));
      }

      document.head.appendChild(script);
    } catch (error) {
      reject(error);
      return;
    }
  });

  // Reset the cache entry if the Promise is rejected so the next call can retry
  const cached: Promise<any> = promise.catch(error => {
    cache.delete(key);
    return Promise.reject(error);
  });

  cache.set(key, cached);
  return cached;
}

/**
 * 캐싱된 loadScript Promise 를 비웁니다.
 *
 * - 인자 없이 호출하면 전체 캐시를 비웁니다.
 * - src 와 namespace 를 모두 전달하면 해당 조합의 캐시만 제거합니다.
 *
 * 외부 SDK 의 reset/cleanup 로직에서 namespace 와 script 를 함께 정리할 때 호출하여
 * 다음 loadScript 호출이 stale promise 를 반환하지 않도록 합니다.
 */
export function clearCache(src?: string, namespace?: string): void {
  if (src != null && namespace != null) {
    cache.delete(cacheKey(src, namespace));
    return;
  }
  cache.clear();
}

function getNamespace<Namespace>(name: string) {
  return (window[name as any] as any) as Namespace | undefined;
}

class NamespaceNotAvailableError extends Error {
  constructor(namespace: string) {
    super(`[TossPayments SDK] ${namespace} is not available`);
    this.name = 'NamespaceNotAvailableError';
  }
}

class ScriptLoadFailedError extends Error {
  constructor(src: string) {
    super(`[TossPayments SDK] Failed to load script: [${src}]`);
    this.name = 'ScriptLoadFailedError';
  }
}