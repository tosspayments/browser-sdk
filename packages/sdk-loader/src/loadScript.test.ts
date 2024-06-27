import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { loadScript, clearCache } from './loadScript';

declare global {
  interface Window {
    [TossPayments: string]: any;
  }
}

describe('loadScript', () => {
  // NOTE: load, error 이벤트를 임의로 발생시키기 위해 이벤트 리스터를 모킹합니다
  let eventListeners1: { [key: string]: EventListener };
  let eventListeners2: { [key: string]: EventListener };

  beforeEach(() => {
    document.head.innerHTML = '';
    document.head.appendChild = vi.fn(); // NOTE: 테스트 환경에서 script inject 방지
    window.TossPayments = undefined;

    // 캐시 초기화
    clearCache();

    eventListeners1 = {};
    eventListeners2 = {};

    const script1 = document.createElement('script');
    const script2 = document.createElement('script');

    script1.addEventListener = (event: string, listener: EventListener) => {
      eventListeners1[event] = listener;
    };

    script2.addEventListener = (event: string, listener: EventListener) => {
      eventListeners2[event] = listener;
    };

    vi.spyOn(document, 'createElement')
      .mockReturnValueOnce(script1)
      .mockReturnValueOnce(script2);
  });

  describe('기본 동작', () => {
    test('script 로드가 완료되면, 주어진 namespace에 생성된 인스턴스와 동일한 인스턴스를 resolve 해야한다', async () => {
      // when
      const promise = loadScript('http://example.com/example.js', 'TossPayments');
      window.TossPayments = {}; // SDK는 주어진 namespace에 인스턴스를 생성함
      eventListeners1.load(new Event('load')); // script 로드가 완료됨

      // then
      expect(promise).resolves.toBe(window.TossPayments);
    });
    test('script 로드를 실패하면, 에러를 throw 해야한다', async () => {
      // when
      const promise = loadScript('http://example.com/example.js', 'TossPayments');
      eventListeners1.error(new Event('error')); // script 로드가 실패함

      // then
      expect(promise).rejects.toThrowError('[TossPayments SDK] Failed to load script: [http://example.com/example.js]');
    });
    test('script 로드를 성공했지만 namespace에 인스턴스가 존재하지 않으면, 에러를 throw 해야한다', async () => {
      // when
      const promise = loadScript('http://example.com/example.js', 'TossPayments');
      eventListeners1.load(new Event('load')); // script 로드가 완료됨

      // then
      expect(promise).rejects.toThrowError('[TossPayments SDK] TossPayments is not available');
    });
  });

  describe('캐시된 script 로더 Promise가 존재하면', () => {
    test('해당 Promise를 반환해야 한다', async () => {
      // when
      const promise1 = loadScript('http://example.com/script.js', 'TossPayments');
      window.TossPayments = {}; // SDK는 주어진 namespace에 인스턴스를 생성함
      eventListeners1.load(new Event('load')); // script 로드가 완료됨

      const promise2 = loadScript('http://example.com/script.js', 'TossPayments');

      // then
      expect(promise1).toBe(promise2);
    });
  });

  describe('캐시된 script 로더 Promise가 존재하지 않으면', () => {
    test('SSR 환경이면 null을 resolve 해야한다', async () => {
      // given
      const originalWindow = window;
      const originalDocument = document;
      window = undefined as any;
      document = undefined as any;

      // when
      const promise = loadScript('http://example.com/script.js', 'TossPayments');
      
      // then
      expect(promise).resolves.toBeNull();

      window = originalWindow;
      document = originalDocument;
    });
    test('주어진 namespace에 인스턴스가 존재하면, 해당 인스턴스를 resolve 해야한다', async () => {
      // when
      window.TossPayments = {};
      const promise = loadScript('http://example.com/script.js', 'TossPayments');

      // then
      expect(promise).resolves.toBe(window.TossPayments);
    });
    test.todo('주어진 src의 script 태그가 존재하면, 기존 script를 제거하고 새로운 script를 inject 해야한다');
  });
});