let cachedPromise: Promise<any> | null = null;

interface LoadOptions {
  priority?: 'high' | 'low' | 'auto';
}

export function loadScript<Namespace>(src: string, namespace: string, options: LoadOptions = {}): Promise<Namespace> {
  if (cachedPromise != null) {
    return cachedPromise;
  }

  const promise = new Promise((resolve, reject) => {
    try {
      if (typeof window === 'undefined' || typeof document === 'undefined') {
        return resolve(null);
      }

      if (getNamespace(namespace) != null) {
        return resolve(getNamespace<Namespace>(namespace));
      }

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

  cachedPromise = promise.catch(error => {
    cachedPromise = null;
    return Promise.reject(error);
  });

  return cachedPromise;
}

function getNamespace<Namespace>(name: string) {
  return (window[name as any] as any) as Namespace | undefined;
}

// Test용
export function clearCache() {
  cachedPromise = null;
}

// Test용
export function getCachedPromise() {
  return cachedPromise;
}

export class NamespaceNotAvailableError extends Error {
  constructor(namespace: string) {
    super(`[TossPayments SDK] ${namespace} is not available`);
    this.name = 'NamespaceNotAvailableError';
  }
}

export class ScriptLoadFailedError extends Error {
  constructor(src: string) {
    super(`[TossPayments SDK] Failed to load script: [${src}]`);
    this.name = 'ScriptLoadFailedError';
  }
}