import { clearCache } from '@tosspayments/sdk-loader';
import { loadedRequests } from './loadTossPayments';

export function clearTossPayments() {
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return;
  }

  for (const { src, namespace } of loadedRequests.values()) {
    const script = document.querySelector(`script[src="${src}"]`);
    script?.parentElement?.removeChild(script);
    clearCache(src, namespace);
  }
  loadedRequests.clear();

  // TODO: public interface에서 TossPayments의 global declaration 추가한 뒤 제거 예정입니다
  // @ts-ignore
  delete window.TossPayments;
}
