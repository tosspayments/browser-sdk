import { afterEach, describe, expect, test, vi } from 'vitest';
import { clearBrandPay } from './clearBrandPay';
import { loadedRequests } from './loadBrandPay';
import { SCRIPT_URL } from './constants';

const NAMESPACE = `BrandPay`;

describe(`clearBrandPay`, () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    document.head.innerHTML = '';
    document.body.innerHTML = '';
    // @ts-ignore
    delete window.BrandPay;
    loadedRequests.clear();
  });

  test(`추적된 default URL 스크립트와 전역 BrandPay 객체를 제거한다`, () => {
    const script = document.createElement(`script`);
    script.src = SCRIPT_URL;
    document.head.appendChild(script);
    loadedRequests.set(SCRIPT_URL, { src: SCRIPT_URL, namespace: NAMESPACE });
    // @ts-ignore
    window.BrandPay = vi.fn();

    clearBrandPay();

    expect(document.querySelector(`script[src="${SCRIPT_URL}"]`)).toBeNull();
    // @ts-ignore
    expect(window.BrandPay).toBeUndefined();
  });

  test(`추적된 custom src 스크립트도 제거한다`, () => {
    const customSrc = `https://js.tosspayments.com/v2/standard`;
    const script = document.createElement(`script`);
    script.src = customSrc;
    document.head.appendChild(script);
    loadedRequests.set(customSrc, { src: customSrc, namespace: NAMESPACE });

    clearBrandPay();

    expect(document.querySelector(`script[src="${customSrc}"]`)).toBeNull();
  });

  test(`clear 후 'BrandPay' 키가 window 에서 완전히 제거되어 'in' 검사가 false 가 된다`, () => {
    // @ts-ignore
    window.BrandPay = vi.fn();

    clearBrandPay();

    expect(`BrandPay` in window).toBe(false);
  });

  test(`document 또는 window 가 undefined 인 SSR 환경에서 throw 하지 않는다`, () => {
    vi.stubGlobal(`document`, undefined);
    vi.stubGlobal(`window`, undefined);

    expect(() => clearBrandPay()).not.toThrow();
  });

  test(`clear 후 loadedRequests state 가 비워진다`, () => {
    loadedRequests.set(SCRIPT_URL, { src: SCRIPT_URL, namespace: NAMESPACE });

    clearBrandPay();

    expect(loadedRequests.size).toBe(0);
  });

  test(`loadedRequests 가 비어있어도 외부에서 inject 한 default SCRIPT_URL 스크립트는 fallback 으로 제거된다`, () => {
    // loadBrandPay 를 거치지 않고 HTML inline / SSR / 외부 코드가 직접 inject 한 케이스
    const script = document.createElement(`script`);
    script.src = SCRIPT_URL;
    document.head.appendChild(script);

    expect(loadedRequests.size).toBe(0); // precondition: 추적 state 비어있음

    clearBrandPay();

    expect(document.querySelector(`script[src="${SCRIPT_URL}"]`)).toBeNull();
  });
});
