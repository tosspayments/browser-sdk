import { SCRIPT_URL } from './constants';

export function clearBrandPay() {
  const script = document.querySelector(`script[src="${SCRIPT_URL}"]`);

  script?.parentElement?.removeChild(script);
  window.BrandPay = undefined;
}
