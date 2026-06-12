import { afterEach, describe, expect, test, vi } from 'vitest';
import { clearTossPayments } from './clearTossPayments';
import { loadedRequests } from './loadTossPayments';
import { SCRIPT_URL } from './constants';

const NAMESPACE = `TossPayments`;

describe(`clearTossPayments`, () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    document.head.innerHTML = '';
    document.body.innerHTML = '';
    // @ts-ignore
    delete window.TossPayments;
    loadedRequests.clear();
  });

  test(`추적된 default URL 스크립트와 전역 TossPayments 객체를 제거한다`, () => {
    const script = document.createElement(`script`);
    script.src = SCRIPT_URL;
    document.head.appendChild(script);
    loadedRequests.set(SCRIPT_URL, { src: SCRIPT_URL, namespace: NAMESPACE });
    // @ts-ignore
    window.TossPayments = vi.fn();

    clearTossPayments();

    expect(document.querySelector(`script[src="${SCRIPT_URL}"]`)).toBeNull();
    // @ts-ignore
    expect(window.TossPayments).toBeUndefined();
  });

  test(`추적된 custom src 스크립트도 제거한다`, () => {
    const customSrc = `https://js.tosspayments.com/v1/brandpay`;
    const script = document.createElement(`script`);
    script.src = customSrc;
    document.head.appendChild(script);
    loadedRequests.set(customSrc, { src: customSrc, namespace: NAMESPACE });

    clearTossPayments();

    expect(document.querySelector(`script[src="${customSrc}"]`)).toBeNull();
  });

  test(`clear 후 'TossPayments' 키가 window 에서 완전히 제거되어 'in' 검사가 false 가 된다`, () => {
    // @ts-ignore
    window.TossPayments = vi.fn();

    clearTossPayments();

    expect(`TossPayments` in window).toBe(false);
  });

  test(`document 또는 window 가 undefined 인 SSR 환경에서 throw 하지 않는다`, () => {
    vi.stubGlobal(`document`, undefined);
    vi.stubGlobal(`window`, undefined);

    expect(() => clearTossPayments()).not.toThrow();
  });

  test(`clear 후 loadedRequests state 가 비워진다`, () => {
    loadedRequests.set(SCRIPT_URL, { src: SCRIPT_URL, namespace: NAMESPACE });

    clearTossPayments();

    expect(loadedRequests.size).toBe(0);
  });
});
