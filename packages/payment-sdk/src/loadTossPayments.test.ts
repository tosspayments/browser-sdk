import { clearCache } from '@tosspayments/sdk-loader';
import { afterEach, describe, expect, test } from 'vitest';
import { SCRIPT_URL } from './constants';
import { loadTossPayments } from './loadTossPayments';

describe('loadTossPayments', () => {
  afterEach(() => {
    document.head.innerHTML = '';
    document.body.innerHTML = '';
    // @ts-ignore
    delete window.TossPayments;

    clearCache();
  });

  test('URL이 들어간 <script>를 <head>에 inject한다', async () => {
    await loadTossPayments('test_key');

    const script = document.querySelector(`script[src="${SCRIPT_URL}"]`);

    expect(script).not.toBeNull();
  });

  test('2회 이상의 중복 호출 시에도 1회만 inject한다', async () => {
    await Promise.all(Array(10).fill(loadTossPayments('test_key')));

    const scripts = document.querySelectorAll(`script[src="${SCRIPT_URL}"]`);

    expect(scripts).toHaveLength(1);
  });

  test(`src를 지정하면 주어진 URL로 script를 로드한다`, async () => {
    const testSource = `https://test.tosspayments.com/sdk`;

    try {
      await loadTossPayments('test_key', {
        src: testSource,
      });
    } catch (e) {
      // NOTE: SDK에서 namespace에 인스턴스를 꽂아주는 동작이 테스트 환경에서는 일어나지 않아 발생하는 에러를 무시합니다
    }

    const script = document.querySelector(`script[src="${testSource}"]`);

    expect(script).not.toBeNull();
  });
});
