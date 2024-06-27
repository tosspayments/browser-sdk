import { beforeEach, describe, expect, test, vi } from 'vitest';
import { loadScript } from './loadScript';

declare global {
  interface Window {
    [key: string]: any;
  }
}

describe('loadScript', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    document.head.innerHTML = '';
    document.head.appendChild = vi.fn(); // script가 inject 되는 것을 방지
    window.TossPayments = undefined;
  });

  describe('기본 동작', () => {
    test('script 로드가 완료되면, 주어진 namespace에 생성된 인스턴스와 동일한 인스턴스를 resolve 해야한다', async () => {
      // given
      const eventListeners: { [key: string]: EventListener } = {};
      const script = document.createElement('script');

      vi.spyOn(document, 'createElement').mockReturnValue(script);

      script.addEventListener = (event: string, listener: EventListener) => {
        eventListeners[event] = listener;
      };

      // when
      const promise = loadScript('http://example.com/example.js', 'TossPayments');
      window.TossPayments = {}; // SDK는 주어진 namespace에 인스턴스를 생성함
      eventListeners.load(new Event('load')); // script 로드가 완료됨

      // then
      expect(promise).resolves.toBe(window.TossPayments);
    });
    test('script 로드를 실패하면, 에러를 throw 해야한다', async () => {
      // given
      const eventListeners: { [key: string]: EventListener } = {};
      const script = document.createElement('script');
      vi.spyOn(document, 'createElement').mockReturnValue(script);

      script.addEventListener = (event: string, listener: EventListener) => {
        eventListeners[event] = listener;
      };

      // when
      const promise = loadScript('http://example.com/example.js', 'TossPayments');
      eventListeners.error(new Event('error')); // script 로드가 실패함

      // then
      expect(promise).rejects.toThrowError('[TossPayments SDK] Failed to load script: [http://example.com/example.js]');
    });
    test('script 로드를 성공했지만 namespace에 인스턴스가 존재하지 않으면, 에러를 throw 해야한다', async () => {
      // given
      const eventListeners: { [key: string]: EventListener } = {};
      const script = document.createElement('script');
      vi.spyOn(document, 'createElement').mockReturnValue(script);

      script.addEventListener = (event: string, listener: EventListener) => {
        eventListeners[event] = listener;
      };

      // when
      const promise = loadScript('http://example.com/example.js', 'TossPayments');
      eventListeners.load(new Event('load')); // script 로드가 완료됨

      // then
      expect(promise).rejects.toThrowError('[TossPayments SDK] TossPayments is not available');
    });
  });

  describe('캐시된 script 로더 Promise가 존재하면', () => {
    test.todo('해당 Promise를 반환해야 한다');
  });

  describe('캐시된 script 로더 Promise가 존재하지 않으면', () => {
    test.todo('SSR 환경이면 null을 resolve 해야한다');
    test.todo('주어진 namespace에 인스턴스가 존재하면, 해당 인스턴스를 resolve 해야한다');
    test.todo('주어진 src의 script 태그가 존재하면, 기존 script를 제거하고 새로운 script를 inject 해야한다');
  });
});