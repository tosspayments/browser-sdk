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
    window.myNamespace = undefined;
  });

  describe('기본 동작', () => {
    test('script 로드가 완료되면, 주어진 namespace에 생성된 인스턴스와 동일한 인스턴스를 resolve 해야한다', async () => {
      // given
      const script = document.createElement('script');
      vi.spyOn(document, 'createElement').mockReturnValue(script);

      // when
      const promise = loadScript('https://test.tosspayments.com/sdk', 'myNamespace');
      script.onload!(new Event('load'));
      window.myNamespace = {}; // SDK는 주어진 namespace에 인스턴스를 생성합니다

      // then
      expect(promise).resolves.toBe(window.myNamespace);
    });
    test.todo('script 로드를 실패하면, Promise를 초기화하고 에러를 throw 해야한다');
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