const SCRIPT_URL = '//web.tosspayments.com/sdk/alpha/tosspayments.js';

function dispatchLoadEvent() {
  // @ts-ignore
  window.TossPayments = jest.fn();
  document.querySelector(`script[src="${SCRIPT_URL}"]`)?.dispatchEvent(new Event('load'));
}

describe('loadTossPayments', () => {
  afterEach(() => {
    document.head.innerHTML = '';
    document.body.innerHTML = '';
    // @ts-ignore
    delete window.TossPayments;
  });

  test('URL이 들어간 <script>를 <head>에 inject한다', async () => {
    const { loadTossPayments } = await import('./index');

    const loadPromise = loadTossPayments('test_key');

    dispatchLoadEvent();

    await loadPromise;

    const script = document.querySelector(`script[src="${SCRIPT_URL}"]`);

    expect(script).not.toBeNull();
  });

  test('2회 이상의 중복 호출 시에도 1회만 inject한다', async () => {
    const { loadTossPayments } = await import('./index');

    const loadPromise = Promise.all(Array(10).fill(loadTossPayments('test_key')));

    dispatchLoadEvent();

    await loadPromise;

    const scripts = document.querySelectorAll(`script[src="${SCRIPT_URL}"]`);

    expect(scripts).toHaveLength(1);
  });
});
