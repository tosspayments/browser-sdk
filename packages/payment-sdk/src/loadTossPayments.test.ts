import { SCRIPT_ID, SCRIPT_URL } from './constants';
import { loadTossPayments } from './loadTossPayments';

function dispatchLoadEvent() {
  // @ts-ignore
  window.TossPayments = jest.fn();
  window?.dispatchEvent(new Event(`TossPayments:initialize:TossPayments`));
}

describe('loadTossPayments', () => {
  afterEach(() => {
    document.head.innerHTML = '';
    document.body.innerHTML = '';
    // @ts-ignore
    delete window.TossPayments;
  });

  test('URL이 들어간 <script>를 <head>에 inject한다', async () => {
    const loadPromise = loadTossPayments('test_key');

    dispatchLoadEvent();

    await loadPromise;

    const script = document.querySelector(`script[src="${SCRIPT_URL}"]`);

    expect(script).not.toBeNull();
    expect(script?.id).toBe(SCRIPT_ID);
  });

  test('2회 이상의 중복 호출 시에도 1회만 inject한다', async () => {
    const loadPromise = Promise.all(Array(10).fill(loadTossPayments('test_key')));

    dispatchLoadEvent();

    await loadPromise;

    const scripts = document.querySelectorAll(`script[src="${SCRIPT_URL}"]`);

    expect(scripts).toHaveLength(1);
  });

  test(`src를 지정하면 주어진 URL로 script를 로드한다`, async () => {
    const testSource = `https://test.tosspayments.com/sdk`;

    const loadPromise = loadTossPayments('test_key', {
      src: `https://test.tosspayments.com/sdk`,
    });

    dispatchLoadEvent();

    await loadPromise;

    const script = document.querySelector(`script[src="${testSource}"]`);
    expect(script?.id).toBe(SCRIPT_ID);

    expect(script).not.toBeNull();
  });
});
