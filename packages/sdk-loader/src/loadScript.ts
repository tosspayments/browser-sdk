let cachedPromise: Promise<any> | null = null;

export function loadScript<Namespace>(src: string, namespace: string): Promise<Namespace> {
  if (cachedPromise != null) {
    return cachedPromise;
  }

  cachedPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
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