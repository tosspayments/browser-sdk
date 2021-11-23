import '@tosspayments/connectpay__types';
import { SCRIPT_ID } from './constants';

export function clearConnectPay() {
  const script = document.getElementById(SCRIPT_ID);

  script?.parentElement?.removeChild(script);
  window.ConnectPay = undefined;
}
