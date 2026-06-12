---
'@tosspayments/sdk-loader': minor
---

src·namespace 조합으로 로드 promise 를 캐싱하여 서로 다른 src 또는 namespace 가 같은 캐시를 공유하지 않도록 동작을 수정합니다. 동일 src·namespace 조합의 동시 호출은 기존처럼 dedupe 됩니다.

`clearCache(src?, namespace?)` 함수를 새로 export 하여, 외부 SDK 가 reset/cleanup 시점에 stale promise 를 비울 수 있도록 합니다. 인자 없이 호출하면 전체 캐시, 둘 다 전달하면 해당 조합의 entry 만 제거합니다.
