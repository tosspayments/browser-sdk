import { SCRIPT_URL } from './constants';

export function clearPaymentWidget() {
  const script = document.querySelector(`script[src="${SCRIPT_URL}"]`);

  script?.parentElement?.removeChild(script);
  window.TossPayments = undefined;
}
