import { SCRIPT_URL } from './constants';

export function clearTossPayments() {
  const script = document.querySelector(`script[src="${SCRIPT_URL}"]`);

  script?.parentElement?.removeChild(script);
  // TODO: public interface에서 TossPayments의 global declaration 추가한 뒤 제거 예정입니다
  // @ts-ignore
  window.TossPayments = undefined;
}
