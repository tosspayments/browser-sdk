---
'@tosspayments/payment-widget-sdk': patch
---

`clearPaymentWidget` 가 default URL 뿐 아니라 `loadPaymentWidget` 가 시도한 모든 src 의 스크립트를 정확히 제거하도록 수정합니다. 패키지 모듈 내부에 (src, namespace) 추적 state 를 두어, custom `src` 로 load 한 케이스에서도 자연스럽게 해당 스크립트와 sdk-loader 의 cache entry 가 함께 정리됩니다.

SSR 환경에서 throw 하지 않도록 document/window 가드를 추가했으며, `window.PaymentWidget` 를 `delete` 로 정리하여 `in` 검사가 false 가 되도록 합니다.

`package.json` 에 `exports` 필드를 추가하여 Node ESM / Vite / Next.js 등 modern bundler 의 conditional resolution(`types`/`import`/`require`) 을 지원합니다. `main`/`module`/`types` 필드는 구버전 호환을 위해 유지됩니다.
