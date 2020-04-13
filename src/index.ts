const ALPHA_URL = '//web.tosspayments.com/sdk/alpha/tosspayments.js';

let cachedPromise: Promise<any> | undefined;

export default async function loadTossPayments(clientKey: string): Promise<any> {
  if (typeof window === 'undefined') {
    return;
  }

  if (cachedPromise !== undefined) {
    return cachedPromise;
  }

  const script = document.createElement('script');
  script.src = ALPHA_URL;

  return new Promise((resolve) => {
    script.addEventListener('load', () => {
      // @ts-ignore
      resolve(window.TossPayments(clientKey));
    });
  });
}
