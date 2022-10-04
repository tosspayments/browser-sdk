import { SCRIPT_ID } from './constants';

export function clearPaymentWidget() {
  const script = document.getElementById(SCRIPT_ID);

  script?.parentElement?.removeChild(script);
  window.PaymentWidget = undefined;
}
