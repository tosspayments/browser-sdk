import { SCRIPT_ID } from './constants';

export function clearTossPayments() {
  const script = document.getElementById(SCRIPT_ID);

  script?.parentElement?.removeChild(script);
  window.TossPayments = undefined;
}
