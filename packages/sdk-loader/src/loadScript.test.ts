import { afterEach, describe, expect, test, vi } from 'vitest';

declare global {
  interface Window {
    [TossPayments: string]: any;
  }
}

describe('loadScript', () => {
  afterEach(() => {
    vi.resetModules();

    delete window.TossPayments;

    document.head.innerHTML = '';
  });

  describe('기본 동작', () => {
    test('script 로드가 완료되면, 주어진 namespace에 생성된 인스턴스와 동일한 인스턴스를 resolve 해야한다', async () => {
      // given
      const { loadScript } = await import('./loadScript');

      const { script } = mockScriptElement();

      // when
      const promise = loadScript('http://example.com/example.js', 'TossPayments');
      window.TossPayments = vi.fn(); // SDK는 주어진 namespace에 인스턴스를 생성함
      script.dispatchEvent(new Event('load')); // script 로드가 완료됨

      // then
      expect(promise).resolves.toBe(window.TossPayments);
    });
    test('script 로드를 실패하면, cachedPromise가 null로 설정되고 에러를 throw 해야한다', async () => {
      // given
      const { loadScript } = await import('./loadScript');
      const { script } = mockScriptElement();

      // when
      const promise = loadScript('http://example.com/example.js', 'TossPayments');
      script.dispatchEvent(new Event('error')); // script 로드가 실패함

      // then
      await expect(promise).rejects.toThrowError('[TossPayments SDK] Failed to load script: [http://example.com/example.js]');

      // 이전 promise의 제거 검증을 위해 재호출하고 promise 객체를 비교
      const promise2 = loadScript('http://example.com/example.js', 'TossPayments');
      expect(promise2).not.toBe(promise);
    });

    test('script 로드를 성공했지만 namespace에 인스턴스가 존재하지 않으면, 에러를 throw 해야한다', async () => {
      // given
      const { loadScript } = await import('./loadScript');
      const { script } = mockScriptElement();

      // when
      const promise = loadScript('http://example.com/example.js', 'TossPayments');
      script.dispatchEvent(new Event('load')); // script 로드가 완료됨

      // then
      expect(promise).rejects.toThrowError('[TossPayments SDK] TossPayments is not available');
    });
    test('priority 옵션을 설정하면, script element의 fetchPriority 속성이 설정되어야 한다', async () => {
      // given
      const { loadScript } = await import('./loadScript');
      const { script } = mockScriptElement();

      // when
      const promise = loadScript('http://example.com/example.js', 'TossPayments', { priority: 'high' });
      window.TossPayments = vi.fn(); // SDK는 주어진 namespace에 인스턴스를 생성함
      script.dispatchEvent(new Event('load')); // script 로드가 완료됨

      // then
      expect((script as any).fetchPriority).toBe('high');
      await expect(promise).resolves.toBe(window.TossPayments);
    });
  });

  describe('캐시된 script 로더 Promise가 존재하면', () => {
    test('해당 Promise를 반환해야 한다', async () => {
      // given
      const { loadScript } = await import('./loadScript');

      const { script } = mockScriptElement();

      // when
      const promise1 = loadScript('http://example.com/script.js', 'TossPayments');
      window.TossPayments = vi.fn(); // SDK는 주어진 namespace에 인스턴스를 생성함
      script.dispatchEvent(new Event('load')); // script 로드가 완료됨

      const promise2 = loadScript('http://example.com/script.js', 'TossPayments');

      // then
      expect(promise1).toBe(promise2);
    });
  });

  describe('캐시된 script 로더 Promise가 존재하지 않으면', () => {
    test('SSR 환경이면 null을 resolve 해야한다', async () => {
      // given
      const { loadScript } = await import('./loadScript');

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
      // given
      const { loadScript } = await import('./loadScript');

      // when
      window.TossPayments = vi.fn();
      const promise = loadScript('http://example.com/script.js', 'TossPayments');

      // then
      expect(promise).resolves.toBe(window.TossPayments);
    });
    test.todo('기존 src를 가진 script가 존재하면, 기존 script의 이벤트를 모두 제거하고 스크립트도 제거한 후 새로 만들어야 한다',);
  });

  describe('src·namespace 조합 캐싱', () => {
    test('다른 src 를 같은 namespace 로 호출하면 각각 별개의 promise 가 생성되고, 두 src 모두 그대로 inject 된다', async () => {
      // given
      const { loadScript } = await import('./loadScript');
      const [scriptA, scriptB] = mockScriptElements(2);

      // when
      const promiseA = loadScript('http://example.com/a.js', 'TossPayments');
      const promiseB = loadScript('http://example.com/b.js', 'TossPayments');

      // then
      expect(promiseA).not.toBe(promiseB);
      expect(scriptA.src).toBe('http://example.com/a.js');
      expect(scriptB.src).toBe('http://example.com/b.js');
    });

    test('같은 src 를 다른 namespace 로 호출하면 각각 별개의 promise 가 생성된다', async () => {
      // given
      const { loadScript } = await import('./loadScript');
      mockScriptElements(2);

      // when
      const promiseA = loadScript('http://example.com/script.js', 'TossPayments');
      const promiseB = loadScript('http://example.com/script.js', 'TossPaymentsBrandpay');

      // then
      expect(promiseA).not.toBe(promiseB);
    });
  });

  describe('clearCache', () => {
    test('인자 없이 호출하면 전체 캐시가 비워져 다음 loadScript 호출이 새 promise 를 생성한다', async () => {
      // given
      const { loadScript, clearCache } = await import('./loadScript');
      mockScriptElements(2);

      // when
      const promise1 = loadScript('http://example.com/script.js', 'TossPayments');
      clearCache();
      const promise2 = loadScript('http://example.com/script.js', 'TossPayments');

      // then
      expect(promise1).not.toBe(promise2);
    });

    test('src·namespace 를 모두 전달하면 해당 entry 만 제거되고, 다른 entry 의 캐시는 유지된다', async () => {
      // given
      const { loadScript, clearCache } = await import('./loadScript');
      mockScriptElements(3);

      const promiseA1 = loadScript('http://example.com/a.js', 'TossPayments');
      const promiseB1 = loadScript('http://example.com/b.js', 'TossPayments');

      // when
      clearCache('http://example.com/a.js', 'TossPayments');

      const promiseA2 = loadScript('http://example.com/a.js', 'TossPayments');
      const promiseB2 = loadScript('http://example.com/b.js', 'TossPayments');

      // then
      expect(promiseA1).not.toBe(promiseA2); // 비워진 entry 는 새 promise
      expect(promiseB1).toBe(promiseB2); // 다른 entry 는 그대로
    });
  });
});

function mockScriptElement() {
  document.head.appendChild = vi.fn(); // NOTE: 테스트 환경에서 script inject 방지

  const script = document.createElement('script');

  vi.spyOn(document, 'createElement')
    .mockReturnValueOnce(script);

  return { script };
}

function mockScriptElements(count: number) {
  document.head.appendChild = vi.fn(); // NOTE: 테스트 환경에서 script inject 방지

  const scripts = Array.from({ length: count }, () => document.createElement('script'));
  const spy = vi.spyOn(document, 'createElement');
  scripts.forEach((s) => spy.mockReturnValueOnce(s));

  return scripts;
}
