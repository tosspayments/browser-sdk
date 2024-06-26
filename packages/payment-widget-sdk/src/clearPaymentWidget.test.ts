import { describe, expect, test, vi } from 'vitest';
import { clearPaymentWidget } from './clearPaymentWidget';
import { SCRIPT_URL } from './constants';

const SCRIPT_ID = `__tosspayments-sdk__`;

describe(`clearPaymentWidget`, () => {
  test(`토스페이먼츠 SDK 스크립트 태그를 제거하고, 전역에 존재하는 TossPayments 객체를 제거한다`, () => {
    // @ts-ignore
    window.PaymentWidget = vi.fn();

    const script = document.createElement(`script`);
    script.src = SCRIPT_URL;
    script.id = `__tosspayments-sdk__`;
    document.head.appendChild(script);

    clearPaymentWidget();

    expect(document.getElementById(SCRIPT_ID)).toBeNull();
    expect(window.PaymentWidget).toBeUndefined();
  });
});
