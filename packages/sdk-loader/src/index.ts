let cachedPromise: Promise<any> | undefined;

export function loadScript<Namespace>(src: string, namespace: string): Promise<Namespace> {
  const existingElement = document.querySelector(`[src="${src}"]`);

  if (existingElement != null && cachedPromise !== undefined) {
    return cachedPromise;
  }

  if (existingElement != null && getNamespace(namespace) !== undefined) {
    return Promise.resolve(getNamespace<Namespace>(namespace)!);
  }

  const script = document.createElement('script');
  script.src = src;

  cachedPromise = new Promise<Namespace>((resolve, reject) => {
    document.head.appendChild(script);

    window.addEventListener(`TossPayments:initialize:${namespace}`, () => {
      if (getNamespace(namespace) !== undefined) {
        resolve(getNamespace(namespace) as Namespace);
      } else {
        reject(new Error(`[TossPayments SDK] Failed to load script: [${src}]`));
      }
    });
  });

  return cachedPromise;
}

function getNamespace<Namespace>(name: string) {
  return (window[name as any] as any) as Namespace | undefined;
}
