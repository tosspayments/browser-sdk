export function loadScript<Namespace>(src: string, namespace: string): Promise<Namespace> {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.addEventListener('load', () => {
      if (window[namespace]) {
        resolve(window[namespace]);
      }
    });
  });

}