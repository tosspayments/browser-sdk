import { SCRIPT_URL } from './constants';

export function clearTossPayments() {
  const script = document.querySelector(`script[src="${SCRIPT_URL}"]`);

  script?.parentElement?.removeChild(script);
  window.TossPayments = undefined;
}
