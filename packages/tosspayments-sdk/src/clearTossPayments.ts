import { clearCache } from '@tosspayments/sdk-loader';
import { SCRIPT_URL } from './constants';
import { loadedRequests } from './loadTossPayments';

export function clearTossPayments() {
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return;
  }

  loadedRequests.forEach(({ src, namespace }) => {
    const script = document.querySelector(`script[src="${src}"]`);
    script?.parentElement?.removeChild(script);
    clearCache(src, namespace);
  });
  loadedRequests.clear();

  // fallback: loadTossPayments 를 거치지 않고 HTML inline / SSR / 다른 코드 경로로 직접 inject 된
  // default SCRIPT_URL 스크립트도 함께 정리합니다. (기존 동작 호환)
  const defaultScript = document.querySelector(`script[src="${SCRIPT_URL}"]`);
  defaultScript?.parentElement?.removeChild(defaultScript);

  // TODO: public interface에서 TossPayments의 global declaration 추가한 뒤 제거 예정입니다
  // @ts-ignore
  delete window.TossPayments;
}
