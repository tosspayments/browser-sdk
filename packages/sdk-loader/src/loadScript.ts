let cachedPromise: Promise<any> | null = null;

interface LoadOptions {
  priority?: 'high' | 'low' | 'auto';
}

export function loadScript<Namespace>(src: string, namespace: string, options: LoadOptions = {}): Promise<Namespace> {
  if (cachedPromise != null) {
    return cachedPromise;
  }

  cachedPromise = new Promise((resolve, reject) => {
    try {
      if (typeof window === 'undefined' || typeof document === 'undefined') {
        return resolve(null);
      }

      if (getNamespace(namespace) != null) {
        return resolve(getNamespace<Namespace>(namespace));
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
          reject(new Error(`[TossPayments SDK] ${namespace} is not available`));
        }
      }

      function onError() {
        reject(new Error(`[TossPayments SDK] Failed to load script: [${src}]`));
      }

      document.head.appendChild(script);
    } catch (error) {
      reject(error);
      return;
    }
  });

  return cachedPromise;
}

function getNamespace<Namespace>(name: string) {
  return (window[name as any] as any) as Namespace | undefined;
}

export function clearCache() {
  cachedPromise = null;
}