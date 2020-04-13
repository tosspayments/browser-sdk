const SCRIPT_URL = '//web.tosspayments.com/sdk/alpha/tosspayments.js';

let cachedPromise: Promise<any> | undefined;

export async function loadTossPayments(clientKey: string): Promise<any> {
  if (typeof window === 'undefined') {
    return;
  }

  const selectedScript = document.querySelector(`script[src="${SCRIPT_URL}"]`);

  if (selectedScript != null && cachedPromise !== undefined) {
    return cachedPromise;
  }

  // @ts-ignore
  if (selectedScript != null && window.TossPayments) {
    // @ts-ignore
    return window.TossPayments(clientKey);
  }

  const script = document.createElement('script');
  script.src = SCRIPT_URL;

  cachedPromise = new Promise((resolve) => {
    document.head.appendChild(script);

    script.addEventListener('load', () => {
      // @ts-ignore
      resolve(window.TossPayments(clientKey));
    });
  });

  return cachedPromise;
}
