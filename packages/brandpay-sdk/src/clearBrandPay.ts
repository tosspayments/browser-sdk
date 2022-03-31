import { SCRIPT_ID } from './constants';

export function clearBrandPay() {
  const script = document.getElementById(SCRIPT_ID);

  script?.parentElement?.removeChild(script);
  window.BrandPay = undefined;
}
