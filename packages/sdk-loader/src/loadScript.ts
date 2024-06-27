let cachedPromise: Promise<any> | null = null;

interface LoadOptions {
  priority?: 'high' | 'low' | 'auto';
}


export function loadScript<Namespace>(src: string, namespace: string, options: LoadOptions = {}): Promise<Namespace> {
  if (cachedPromise != null) {
    return cachedPromise;
  }

  cachedPromise = new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return resolve(null);
    }

    if (window[namespace] != null) {
      return resolve(window[namespace]);
    }

    const script = document.createElement('script');
    if (options.priority != null) {
      (script as any).fetchPriority = options.priority;
    }

    script.src = src;
    script.addEventListener('load', () => {
      if (window[namespace]) {
        resolve(window[namespace]);
      } else {
        reject(new Error(`[TossPayments SDK] ${namespace} is not available`));
      }
    });

    script.addEventListener('error', () => {
      reject(new Error(`[TossPayments SDK] Failed to load script: [${src}]`))
    });

    document.head.appendChild(script);
  });

  return cachedPromise;
}

export function clearCache() {
  cachedPromise = null;
}