import { clearTossPayments } from './clearTossPayments';

const SCRIPT_ID = `__tosspayments-sdk__`;

describe(`clearTossPayments`, () => {
  test(`토스페이먼츠 SDK 스크립트 태그를 제거하고, 전역에 존재하는 TossPayments 객체를 제거한다`, () => {
    // @ts-ignore
    window.TossPayments = jest.fn();

    const script = document.createElement(`script`);
    script.src = `https://js.tosspayments.com/v1`;
    script.id = `__tosspayments-sdk__`;
    document.head.appendChild(script);

    clearTossPayments();

    expect(document.getElementById(SCRIPT_ID)).toBeNull();
    expect(window.TossPayments).toBeUndefined();
  });
});
