# Change Log

## 2.1.0

### Minor Changes

- 13f9ad0: src·namespace 조합으로 로드 promise 를 캐싱하여 서로 다른 src 또는 namespace 가 같은 캐시를 공유하지 않도록 동작을 수정합니다. 동일 src·namespace 조합의 동시 호출은 기존처럼 dedupe 됩니다.

  `clearCache(src?, namespace?)` 함수를 새로 export 하여, 외부 SDK 가 reset/cleanup 시점에 stale promise 를 비울 수 있도록 합니다. 인자 없이 호출하면 전체 캐시, 둘 다 전달하면 해당 조합의 entry 만 제거합니다.

## 2.0.2

### Patch Changes

- e71af56: apply oidc

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.1](https://github.com/tosspayments/browser-sdk/compare/@tosspayments/sdk-loader@2.0.0...@tosspayments/sdk-loader@2.0.1) (2024-07-02)

### Reverts

- Revert "chore(release): publish [skip ci]" (#110) ([8d16f50](https://github.com/tosspayments/browser-sdk/commit/8d16f50254ed7d4b23bd8af73d33b487b7607983)), closes [#110](https://github.com/tosspayments/browser-sdk/issues/110)
- Revert "chore(release): publish [skip ci]" (#108) ([e513618](https://github.com/tosspayments/browser-sdk/commit/e513618478149495a586518318565201461fc74e)), closes [#108](https://github.com/tosspayments/browser-sdk/issues/108)

# Change Log

# [1.2.0](https://github.com/tosspayments/browser-sdk/compare/@tosspayments/sdk-loader@1.1.0...@tosspayments/sdk-loader@1.2.0) (2023-11-30)

### Features

- **brandpay-sdk:** sdk load priority 옵션 추가 ([#87](https://github.com/tosspayments/browser-sdk/issues/87)) ([80b990c](https://github.com/tosspayments/browser-sdk/commit/80b990c92d67ece45ef5f4611eab55715d4d92a6))

# [1.1.0](https://github.com/tosspayments/browser-sdk/compare/@tosspayments/sdk-loader@1.0.3...@tosspayments/sdk-loader@1.1.0) (2021-12-16)

### Features

- **sdk-loader:** npm publish ([019af8f](https://github.com/tosspayments/browser-sdk/commit/019af8f8e3c36c2dd7ae03ad25088645bcd5d9ee))

## 1.0.3 (2021-11-22)

**Note:** Version bump only for package @tosspayments/sdk-loader

## 1.0.2 (2021-11-22)

**Note:** Version bump only for package @tosspayments/sdk-loader

## 1.0.1 (2021-11-22)

**Note:** Version bump only for package @tosspayments/sdk-loader
