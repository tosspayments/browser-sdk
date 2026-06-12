# Change Log

## 0.12.2

### Patch Changes

- 1a7180d: `clearPaymentWidget` 가 default URL 뿐 아니라 `loadPaymentWidget` 가 시도한 모든 src 의 스크립트를 정확히 제거하도록 수정합니다. 패키지 모듈 내부에 (src, namespace) 추적 state 를 두어, custom `src` 로 load 한 케이스에서도 자연스럽게 해당 스크립트와 sdk-loader 의 cache entry 가 함께 정리됩니다.

  SSR 환경에서 throw 하지 않도록 document/window 가드를 추가했으며, `window.PaymentWidget` 를 `delete` 로 정리하여 `in` 검사가 false 가 되도록 합니다.

  `package.json` 에 `exports` 필드를 추가하여 Node ESM / Vite / Next.js 등 modern bundler 의 conditional resolution(`types`/`import`/`require`) 을 지원합니다. `main`/`module`/`types` 필드는 구버전 호환을 위해 유지됩니다.

## 0.12.1

### Patch Changes

- fbd9806: apply oidc

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.12.0](https://github.com/tosspayments/browser-sdk/compare/@tosspayments/payment-widget-sdk@0.11.1...@tosspayments/payment-widget-sdk@0.12.0) (2024-09-04)

### Features

- @tosspayments/payment-widget\_\_types 버전업 ([#122](https://github.com/tosspayments/browser-sdk/issues/122)) ([283fa62](https://github.com/tosspayments/browser-sdk/commit/283fa62541242593c74df3713e57f62f61b74dee))

## [0.11.1](https://github.com/tosspayments/browser-sdk/compare/@tosspayments/payment-widget-sdk@0.11.0...@tosspayments/payment-widget-sdk@0.11.1) (2024-07-02)

### Reverts

- Revert "chore(release): publish [skip ci]" (#110) ([8d16f50](https://github.com/tosspayments/browser-sdk/commit/8d16f50254ed7d4b23bd8af73d33b487b7607983)), closes [#110](https://github.com/tosspayments/browser-sdk/issues/110)
- Revert "chore(release): publish [skip ci]" (#108) ([e513618](https://github.com/tosspayments/browser-sdk/commit/e513618478149495a586518318565201461fc74e)), closes [#108](https://github.com/tosspayments/browser-sdk/issues/108)

# Change Log

## [0.10.2](https://github.com/tosspayments/browser-sdk/compare/@tosspayments/payment-widget-sdk@0.10.1...@tosspayments/payment-widget-sdk@0.10.2) (2023-12-18)

### Bug Fixes

- **payment-widget-sdk:** 타입 정보 버전업 ([#91](https://github.com/tosspayments/browser-sdk/issues/91)) ([07c85e2](https://github.com/tosspayments/browser-sdk/commit/07c85e28c95d0ee4867dbf90ed482d8610ca6755))

## [0.10.1](https://github.com/tosspayments/browser-sdk/compare/@tosspayments/payment-widget-sdk@0.10.0...@tosspayments/payment-widget-sdk@0.10.1) (2023-12-12)

**Note:** Version bump only for package @tosspayments/payment-widget-sdk

# [0.10.0](https://github.com/tosspayments/browser-sdk/compare/@tosspayments/payment-widget-sdk@0.9.3...@tosspayments/payment-widget-sdk@0.10.0) (2023-10-16)

### Bug Fixes

- **payment-widget-sdk:** 타입 배포 트리거 ([#78](https://github.com/tosspayments/browser-sdk/issues/78)) ([f6c7815](https://github.com/tosspayments/browser-sdk/commit/f6c78159ddb2568c2b242ca2563314f3d2acdf4d))

### Features

- **payment-widget-sdk:** renderAgreement options param ([#76](https://github.com/tosspayments/browser-sdk/issues/76)) ([ea621dd](https://github.com/tosspayments/browser-sdk/commit/ea621ddf6c60b643c393f84e6ad7fa9ed98bcd92))
- **payment-widget-sdk:** 타입 배포 트리거 ([#81](https://github.com/tosspayments/browser-sdk/issues/81)) ([5730c4a](https://github.com/tosspayments/browser-sdk/commit/5730c4a891e1711f27d2cab1abb9d88f15031c9f))
- **payment-widget-service:** 결제위젯 타입 배포 트리거 ([#79](https://github.com/tosspayments/browser-sdk/issues/79)) ([31c358d](https://github.com/tosspayments/browser-sdk/commit/31c358daf694d621cb89606f6dcace030cec79d2))

### Reverts

- Revert "chore(release): publish [skip ci]" ([c265212](https://github.com/tosspayments/browser-sdk/commit/c265212f292a14319d24645d45a6c41b91c6b7e2))

## [0.9.3](https://github.com/tosspayments/browser-sdk/compare/@tosspayments/payment-widget-sdk@0.9.2...@tosspayments/payment-widget-sdk@0.9.3) (2023-08-29)

### Bug Fixes

- **payment-widget-sdk:** 의존한 \_\_types 패키지 버전 업 ([#71](https://github.com/tosspayments/browser-sdk/issues/71)) ([08b88ee](https://github.com/tosspayments/browser-sdk/commit/08b88eed7518c521f4253dca85b66edc020b1c40))

## [0.9.2](https://github.com/tosspayments/browser-sdk/compare/@tosspayments/payment-widget-sdk@0.9.1...@tosspayments/payment-widget-sdk@0.9.2) (2023-08-21)

### Bug Fixes

- **payment-widget-sdk:** 결제위젯 타입 버전 업 ([#67](https://github.com/tosspayments/browser-sdk/issues/67)) ([3220aac](https://github.com/tosspayments/browser-sdk/commit/3220aac1193d0e18fc1b394bd40a930dad6f6dea))

## [0.9.1](https://github.com/tosspayments/browser-sdk/compare/@tosspayments/payment-widget-sdk@0.9.0...@tosspayments/payment-widget-sdk@0.9.1) (2023-07-14)

### Bug Fixes

- **payment-widget-sdk:** requestPayment 파라미터 타입 수정 ([#64](https://github.com/tosspayments/browser-sdk/issues/64)) ([9e09362](https://github.com/tosspayments/browser-sdk/commit/9e093620894515090a599d4a6082ef936704c60c))

# [0.9.0](https://github.com/tosspayments/browser-sdk/compare/@tosspayments/payment-widget-sdk@0.8.2...@tosspayments/payment-widget-sdk@0.9.0) (2023-07-04)

### Features

- 위젯 타입 버전 올림 ([#62](https://github.com/tosspayments/browser-sdk/issues/62)) ([5194a1e](https://github.com/tosspayments/browser-sdk/commit/5194a1e4d78c369a31a618bca0cbc51fdf8d2526))

## [0.8.2](https://github.com/tosspayments/browser-sdk/compare/@tosspayments/payment-widget-sdk@0.8.1...@tosspayments/payment-widget-sdk@0.8.2) (2023-06-22)

### Bug Fixes

- **payment-widget-sdk:** 결제위젯 payment, brandpay type 의존성 추가 ([#61](https://github.com/tosspayments/browser-sdk/issues/61)) ([93ef161](https://github.com/tosspayments/browser-sdk/commit/93ef161ad7f4224b3bd005e5f8ae77dedc7bc861))

## [0.8.1](https://github.com/tosspayments/browser-sdk/compare/@tosspayments/payment-widget-sdk@0.8.0...@tosspayments/payment-widget-sdk@0.8.1) (2023-06-22)

### Bug Fixes

- **payment-widget-sdk:** currency 타입 수정 ([#60](https://github.com/tosspayments/browser-sdk/issues/60)) ([f4e0a7b](https://github.com/tosspayments/browser-sdk/commit/f4e0a7b893c76d4c3aadf423e456fd2ecd8d5100))

# [0.8.0](https://github.com/tosspayments/browser-sdk/compare/@tosspayments/payment-widget-sdk@0.7.3...@tosspayments/payment-widget-sdk@0.8.0) (2023-05-31)

### Features

- **payment-widget-sdk:** 결제위젯 renderPaymentMethods 인터페이스 수정 ([#57](https://github.com/tosspayments/browser-sdk/issues/57)) ([ee9eaed](https://github.com/tosspayments/browser-sdk/commit/ee9eaed10fda35cb4bb54fd725fa6442659ffb50))

## [0.7.3](https://github.com/tosspayments/browser-sdk/compare/@tosspayments/payment-widget-sdk@0.7.2...@tosspayments/payment-widget-sdk@0.7.3) (2023-05-19)

### Bug Fixes

- **payment-widget-sdk:** 타입 버전 업 ([#56](https://github.com/tosspayments/browser-sdk/issues/56)) ([cc9447c](https://github.com/tosspayments/browser-sdk/commit/cc9447ca7de36c9814988597c575b1ee5fc0688e))

## [0.7.2](https://github.com/tosspayments/browser-sdk/compare/@tosspayments/payment-widget-sdk@0.7.1...@tosspayments/payment-widget-sdk@0.7.2) (2023-05-17)

### Bug Fixes

- **payment-widget-sdk:** 타입 버전 업 ([#55](https://github.com/tosspayments/browser-sdk/issues/55)) ([2fb783f](https://github.com/tosspayments/browser-sdk/commit/2fb783fd8f1820ebf2830577a25d3c483604c6d6))

## [0.7.1](https://github.com/tosspayments/browser-sdk/compare/@tosspayments/payment-widget-sdk@0.7.0...@tosspayments/payment-widget-sdk@0.7.1) (2023-03-29)

### Bug Fixes

- 결제위젯 options 타입이 required인 문제 수정 ([85c80e0](https://github.com/tosspayments/browser-sdk/commit/85c80e0546b37f8a64fc73b5ba21a3e68c0a0279))

# [0.7.0](https://github.com/tosspayments/browser-sdk/compare/@tosspayments/payment-widget-sdk@0.5.6...@tosspayments/payment-widget-sdk@0.7.0) (2023-03-20)

### Features

- **payment-widget-sdk:** 결제위젯 옵션 추가, 의존성 추가 ([#50](https://github.com/tosspayments/browser-sdk/issues/50)) ([5b429c7](https://github.com/tosspayments/browser-sdk/commit/5b429c7b18c9daefb9999b4b0fee8aa795264023))
- **payment-widget-sdk:** 결제위젯 옵션 추가, 의존성 추가 ([#52](https://github.com/tosspayments/browser-sdk/issues/52)) ([46ed31e](https://github.com/tosspayments/browser-sdk/commit/46ed31ef9ef76e66ae4e45992c100e1e542a7deb))

# [0.6.0](https://github.com/tosspayments/browser-sdk/compare/@tosspayments/payment-widget-sdk@0.5.6...@tosspayments/payment-widget-sdk@0.6.0) (2023-03-20)

### Features

- **payment-widget-sdk:** 결제위젯 옵션 추가, 의존성 추가 ([#50](https://github.com/tosspayments/browser-sdk/issues/50)) ([5b429c7](https://github.com/tosspayments/browser-sdk/commit/5b429c7b18c9daefb9999b4b0fee8aa795264023))

## [0.5.6](https://github.com/tosspayments/browser-sdk/compare/@tosspayments/payment-widget-sdk@0.6.0...@tosspayments/payment-widget-sdk@0.5.6) (2023-03-15)

### Bug Fixes

- src로 스크립트 찾아서 clear ([#49](https://github.com/tosspayments/browser-sdk/issues/49)) ([966fd30](https://github.com/tosspayments/browser-sdk/commit/966fd301cd5344cbf4a110d2874d1cdf9306c4d2))

## [0.5.5](https://github.com/tosspayments/browser-sdk/compare/@tosspayments/payment-widget-sdk@0.5.4...@tosspayments/payment-widget-sdk@0.5.5) (2023-03-08)

### Bug Fixes

- **payment-widget-sdk:** 타입 버전 업 ([#47](https://github.com/tosspayments/browser-sdk/issues/47)) ([c2f6a09](https://github.com/tosspayments/browser-sdk/commit/c2f6a0908958e6b0eca424732300c64bd3cc29b3))

## [0.5.4](https://github.com/tosspayments/browser-sdk/compare/@tosspayments/payment-widget-sdk@0.5.3...@tosspayments/payment-widget-sdk@0.5.4) (2023-02-01)

### Bug Fixes

- **payment-widget-sdk:** 타입 버전 업 ([#44](https://github.com/tosspayments/browser-sdk/issues/44)) ([f27dbfb](https://github.com/tosspayments/browser-sdk/commit/f27dbfb61b371d0805dd612f7a747c18fbc8c00d))

## [0.5.3](https://github.com/tosspayments/browser-sdk/compare/@tosspayments/payment-widget-sdk@0.5.2...@tosspayments/payment-widget-sdk@0.5.3) (2023-02-01)

### Bug Fixes

- **payment-widget-sdk:** 타입 버전 업 ([#43](https://github.com/tosspayments/browser-sdk/issues/43)) ([900bb15](https://github.com/tosspayments/browser-sdk/commit/900bb15e5b2fd6fddeac01948c9f59ce03d97fe3))

## [0.5.2](https://github.com/tosspayments/browser-sdk/compare/@tosspayments/payment-widget-sdk@0.5.1...@tosspayments/payment-widget-sdk@0.5.2) (2023-01-18)

### Bug Fixes

- **payment-widget-sdk:** 타입 버전 업 ([#38](https://github.com/tosspayments/browser-sdk/issues/38)) ([b388268](https://github.com/tosspayments/browser-sdk/commit/b388268f5247e3c374bdf5ed7ae4179f8ecea421))

## [0.5.1](https://github.com/tosspayments/browser-sdk/compare/@tosspayments/payment-widget-sdk@0.4.1...@tosspayments/payment-widget-sdk@0.5.1) (2023-01-17)

### Bug Fixes

- **payment-widget-sdk:** 결제위젯 타이핑 버전 업 ([#36](https://github.com/tosspayments/browser-sdk/issues/36)) ([da98529](https://github.com/tosspayments/browser-sdk/commit/da98529becacc04ec7d020167b142845ff1c561d))

## [0.4.1](https://github.com/tosspayments/browser-sdk/compare/@tosspayments/payment-widget-sdk@0.5.0...@tosspayments/payment-widget-sdk@0.4.1) (2023-01-17)

### Bug Fixes

- **payment-widget-sdk:** 타입 버전 업 ([#35](https://github.com/tosspayments/browser-sdk/issues/35)) ([c7747b8](https://github.com/tosspayments/browser-sdk/commit/c7747b853a21c68b4060ae147267a2d778eea495))

# [0.5.0](https://github.com/tosspayments/browser-sdk/compare/@tosspayments/payment-widget-sdk@0.4.0...@tosspayments/payment-widget-sdk@0.5.0) (2022-12-22)

### Features

- **payment-widget-sdk:** 결제위젯 타이핑 타입업 ([#33](https://github.com/tosspayments/browser-sdk/issues/33)) ([5f5c8d2](https://github.com/tosspayments/browser-sdk/commit/5f5c8d2c29642bb289a0febe2ac1beffd909573b))

# [0.4.0](https://github.com/tosspayments/browser-sdk/compare/@tosspayments/payment-widget-sdk@0.3.0...@tosspayments/payment-widget-sdk@0.4.0) (2022-11-02)

### Features

- **payment-widget-sdk:** ANONYMOUS 사용할 수 있도록 추가 ([69b8a39](https://github.com/tosspayments/browser-sdk/commit/69b8a3954eaf1c1fb8bed05e24a8930f4e8c748f))

# [0.3.0](https://github.com/tosspayments/browser-sdk/compare/@tosspayments/payment-widget-sdk@0.1.0...@tosspayments/payment-widget-sdk@0.3.0) (2022-10-21)

### Features

- **payment-widget-sdk:** 결제위젯 SDK 버전 업데이트 ([66ceaca](https://github.com/tosspayments/browser-sdk/commit/66ceacab2bfacdb73409c9130185f117a5686dc0))

# 0.1.0 (2022-10-04)

### Features

- **payment-widget-sdk:** 결제위젯 SDK 추가 ([92988fa](https://github.com/tosspayments/browser-sdk/commit/92988fad6055d5eb9db9400a1194086f80184ed4))
