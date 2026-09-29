// standard-public-interfaces 2.19.2 — 자동 생성 파일입니다. 직접 수정하지 마세요.

type WidgetSelectedPaymentMethod = {
    /**
     * 구매자가 결제 UI에서 선택한 결제수단입니다. 예를 들어, 신용・체크카드를 선택하면 `CARD` 코드가 응답됩니다. [ENUM 코드](/codes/enum-codes) 및 [기관 코드](/codes/org-codes)를 참고하세요.
     */
    code: Exclude<WidgetsPaymentMethodCode, 'BRANDPAY'>;
} | {
    code: 'BRANDPAY';
    /**
     * 현재 브랜드페이에서 선택되어 있는 결제수단의 ID입니다.
     */
    methodId?: string;
};
type WidgetsPaymentMethodCode = 'CARD' | 'VIRTUAL_ACCOUNT' | 'MOBILE_PHONE' | 'TRANSFER' | 'CULTURE_GIFT_CERTIFICATE' | 'GAME_GIFT_CERTIFICATE' | 'BOOK_GIFT_CERTIFICATE' | 'TOSSPAY' | 'NAVERPAY' | 'SAMSUNGPAY' | 'LPAY' | 'KAKAOPAY' | 'PAYCO' | 'SSG' | 'APPLEPAY' | 'PINPAY' | 'KBPAY' | 'PAYPAL' | 'GCASH' | 'TOUCHNGO' | 'BOOST' | 'BPI' | 'BILLEASE' | 'DANA' | 'ALIPAYHK' | 'TRUEMONEY' | 'RABBIT_LINE_PAY' | 'ALIPAY' | 'SHINHAN' | 'HYUNDAI' | 'SAMSUNG' | 'WOORI' | 'KOOKMIN' | 'LOTTE' | 'NONGHYEOP' | 'HANA' | 'BC' | 'KDBBANK' | 'TOSSBANK' | 'KAKAOBANK' | 'SUHYEOP' | 'JEONBUKBANK' | 'KBANK' | 'POST' | 'SAEMAUL' | 'CITI' | 'SAVINGBANK' | 'JEJUBANK' | 'GWANGJUBANK' | 'SHINHYEOP' | 'JCB' | 'UNIONPAY' | 'MASTER' | 'VISA' | 'DINERS' | 'DISCOVER' | 'IBK_BC' | 'AMEX' | 'TOSS_PAYMENTS' | 'BANKPAY' | 'BRANDPAY' | 'KEYIN' | (NonNullable<unknown> & string);

interface WidgetPaymentMethodWidget {
    /**
     * 결제 UI의 이벤트를 구독합니다. [자세히 >](#paymentmethodwidgeton)
     *
     * @example
     *  ```javascript
     *  paymentMethodWidget.on('paymentMethodSelect', selectedPaymentMethod => {
          if (selectedPaymentMethod.code === '카드') {
            // 카드 안내사항 노출
          }
          if (selectedPaymentMethod.code === '문화바우처') {
            // 커스텀 결제수단 (결제 Pro 플랜 기능)
            // 문화바우처 안내사항 노출
          }
        });
     * ```
     *
     * @param {'paymentMethodSelect'} eventName 구독할 이벤트입니다. `paymentMethodSelect` 이벤트로 구매자가 선택한 결제수단 코드를 확인하세요. 일반결제는 [결제수단 ENUM 코드](/codes/enum-codes#결제수단-타입)가 응답돼요. 결제 Pro 플랜으로 [커스텀 결제수단](/guides/v2/payment-widget/pro/integration-custom)을 연동했다면 결제 어드민에서 설정한 `key` 값이 응답돼요.
     * @param {function} callback 이벤트가 일어나면 호출되는 콜백 함수입니다.
     *
     * @throws {@link PublicError.Widgets.InvalidEventParameterError} eventName이 유효하지 않은 경우
     * @throws {@link PublicError.Widgets.InvalidCallbackParameterError} callback이 유효하지 않은 경우
     * @throws {@link PublicError.Widgets.UnknownError} 알 수 없는 오류가 발생한 경우
     */
    on: (eventName: 'paymentMethodSelect', callback: (paymentMethod: WidgetSelectedPaymentMethod) => void) => void;
    /**
     * 구매자가 선택한 결제수단을 불러옵니다. [자세히 >](#paymentmethodwidgetgetselectedpaymentmethod)
     *
     * @example
     *  ```javascript
     *  const paymentMethod = await paymentMethodWidget.getSelectedPaymentMethod();
     * ```
     *
     * @throws {@link PublicError.Widgets.UnknownError} 알 수 없는 오류가 발생한 경우
     */
    getSelectedPaymentMethod: () => Promise<WidgetSelectedPaymentMethod>;
    /**
     * 결제 UI 객체를 제거합니다. [자세히 >](#paymentmethodwidgetdestroy)
     *
     * @example
     *  ```javascript
     *  await paymentMethodWidget.destroy();
     * ```
     *
     * @throws {@link PublicError.Widgets.UnknownError} 알 수 없는 오류가 발생한 경우
     */
    destroy: () => Promise<void>;
}

interface WidgetAgreementStatus {
    agreedRequiredTerms: boolean;
    agreements: Array<{
        term: {
            id: string;
            required: boolean;
        };
        agreed: boolean;
    }>;
}

interface WidgetAgreementWidget {
    /**
     * 약관 UI의 이벤트를 구독합니다. [자세히 >](#agreementwidgeton)
     *
     * @param {'agreementStatusChange'} eventName 구독할 이벤트입니다. `agreementStatusChange` 이벤트로 구매자가 약관에 동의했는지 확인하세요.
     * @param {function} callback 이벤트가 일어나면 호출되는 콜백 함수입니다.
     *
     * @example
     *  ```javascript
     *  agreementWidget.on('agreementStatusChange', agreementStatus => {
          if (agreementStatus.agreedRequiredTerms) {
            // 결제 버튼 활성화
          } else {
            // 결제 버튼 비활성화
          }
        });
     * ```
     *
     * @throws {@link PublicError.Widgets.InvalidEventParameterError} eventName이 유효하지 않은 경우
     * @throws {@link PublicError.Widgets.InvalidCallbackParameterError} callback이 유효하지 않은 경우
     * @throws {@link PublicError.Widgets.UnknownError} 알 수 없는 오류가 발생한 경우
     */
    on: (eventName: 'agreementStatusChange', callback: (agreementStatus: WidgetAgreementStatus) => void) => void;
    /**
     * 약관 UI 객체를 제거합니다. [자세히 >](#agreementwidgetdestroy)
     *
     * @example
     *  ```javascript
     *  await agreementWidget.destroy();
     * ```
     *
     * @throws {@link PublicError.Widgets.UnknownError} 알 수 없는 오류가 발생한 경우
     */
    destroy: () => Promise<void>;
}

interface WidgetPaymentRequest {
    /**
     * 주문번호입니다. 각 주문을 구분하는 무작위한 고유값을 생성하세요. 영문 대소문자, 숫자, 특수문자 `-`, `_`, `=`로 이루어진 6자 이상 64자 이하의 문자열이어야 합니다.
     */
    orderId: string;
    /**
     * 구매상품입니다. 예를 들면 `생수 외 1건` 같은 형식입니다. 최대 길이는 100자입니다.
     */
    orderName: string;
    /**
     * 구매자 이메일입니다. 결제 상태가 바뀌면 이메일 주소로 결제내역이 전송됩니다. 최대 길이는 100자입니다.
     */
    customerEmail?: string | null;
    /**
     * 구매자명입니다. 최대 길이는 100자입니다.
     */
    customerName?: string | null;
    /**
     * 구매자의 휴대폰 번호입니다. 가상계좌 안내, 퀵계좌이체 휴대폰 번호 자동 완성에 사용되고 있어요. `-` 없이 숫자로만 구성된 최소 8자, 최대 15자의 문자열입니다.
     */
    customerMobilePhone?: string | null;
    /**
     * 결제 금액 중 면세 금액입니다. 면세 상점 혹은 복합 과세 상점으로 계약된 상점만 사용하세요. 자세한 내용은 세금 처리 가이드에서 확인하세요.
     */
    taxFreeAmount?: number | null;
    /**
     * 브라우저에서 결제창이 열리는 프레임입니다. `self`, `iframe` 중 하나입니다.
     *
     * \- `self`는 현재 브라우저를 결제창으로 이동시켜요. 모바일 환경에서 기본 값입니다.
     *
     * \- `iframe`은 iframe에서 결제창이 열려요. PC 환경에서 기본 값입니다. **모바일 환경에서는 `iframe`을 사용할 수 없습니다.**
     */
    windowTarget?: 'iframe' | 'self' | null;
    /**
     * @ignore
     */
    pendingUrl?: string | null;
    /**
     * 결제 관련 정보를 추가할 수 있는 객체입니다. 최대 5개의 키-값(key-value) 쌍을 자유롭게 추가해주세요. 키는 `[` , `]` 를 사용하지 않는 최대 40자의 문자열, 값은 최대 2000자의 문자열입니다.
     */
    metadata?: Record<string | symbol | number, unknown> | null;
    /**
     * @ignore
     */
    sandbox?: {
        /**
         * @ignore
         */
        paymentResult: 'SUCCESS' | 'FAIL';
    };
    /**
     * 구매자가 카드를 선택하면 결제에 적용되는 옵션입니다.
     */
    card?: {
        /**
         * 과세를 제외한 결제 금액(컵 보증금 등)입니다. 값을 넣지 않으면 기본값인 0으로 설정됩니다.
         * 과세 제외 금액이 있는 카드 결제는 부분 취소가 안 됩니다.
         */
        taxExemptionAmount?: number | null;
        /**
         * 페이북/ISP 앱에서 상점 앱으로 돌아올 때 사용됩니다. 상점의 앱 스킴을 지정하면 됩니다. 예를 들면 testapp://같은 형태입니다.
         */
        appScheme?: string | null;
        /**
         * @ignore
         */
        threeDS?: {
            /**
             * @ignore
             */
            challengeMode?: 'CHALLENGE_REQUIRED' | null;
        } | null;
    } | null;
    /**
     * 구매자가 계좌이체를 선택하면 결제에 적용되는 옵션입니다.
     */
    transfer?: {
        /**
         * 에스크로 적용 여부입니다. `true`로 설정하면 구매자가 반드시 에스크로 적용에 동의해야 결제가 완료돼요.
         * `false`로 설정하거나 파라미터를 설정하지 않으면 에스크로 적용을 구매자 선택에 맡겨요.
         */
        useEscrow?: boolean | null;
        /**
         * 각 상품의 상세 정보 객체를 담는 배열입니다. 에스크로를 사용하는 상점이라면 필수 파라미터입니다.
         * 예를 들어 사용자가 세 가지 종류의 상품을 구매했다면 길이가 3인 배열이어야 합니다.
         */
        escrowProducts?: Array<{
            /**
             * 각 상품의 고유 ID입니다.
             */
            id?: string | null;
            /**
             * 상품명입니다.
             */
            name?: string | null;
            /**
             * 내 상점에서 사용하는 상품 관리 코드입니다.
             */
            code?: string | null;
            /**
             * 상품의 1개의 개별 가격입니다.
             */
            unitPrice?: number | null;
            /**
             * 상품 구매 수량입니다.
             */
            quantity?: number | null;
        }> | null;
        /**
         * 문화비(도서, 공연 티켓, 박물관·미술관 입장권 등) 지출 여부입니다.
         */
        isCulturalExpenses?: boolean | null;
    } | null;
    /**
     * 구매자가 가상계좌를 선택하면 결제에 적용되는 옵션입니다.
     */
    virtualAccount?: {
        /**
         * 에스크로 사용 여부입니다. 값을 주지 않으면 결제창에서 고객이 직접 에스크로 결제 여부를 선택합니다.
         */
        useEscrow?: boolean | null;
        /**
         * 각 상품의 상세 정보 객체를 담는 배열입니다. 에스크로를 사용하는 상점이라면 필수 파라미터입니다.
         * 예를 들어 사용자가 세 가지 종류의 상품을 구매했다면 길이가 3인 배열이어야 합니다.
         */
        escrowProducts?: Array<{
            /**
             * 각 상품의 고유 ID입니다.
             */
            id?: string | null;
            /**
             * 상품명입니다.
             */
            name?: string | null;
            /**
             * 내 상점에서 사용하는 상품 관리 코드입니다.
             */
            code?: string | null;
            /**
             * 상품의 1개의 개별 가격입니다.
             */
            unitPrice?: number | null;
            /**
             * 상품 구매 수량입니다.
             */
            quantity?: number | null;
        }> | null;
        /**
         * 현금영수증 정보입니다.
         */
        cashReceipt?: {
            /**
             * 현금영수증 발급 용도입니다. '소득공제', '지출증빙', '미발행' 중 하나입니다.
             */
            type: '소득공제' | '지출증빙' | '미발행';
        } | null;
        /**
         * 문화비(도서, 공연 티켓, 박물관·미술관 입장권 등) 지출 여부입니다.
         */
        isCulturalExpenses?: boolean | null;
    } | null;
    /**
     * 구매자가 해외간편결제를 선택하면 결제에 적용되는 옵션입니다.
     */
    foreignEasyPay?: {
        /**
         * 구매자가 위치한 국가입니다. ISO-3166의 두 자리 국가 코드를 입력하세요.
         */
        country: string;
        /**
         * 구매 상품 정보입니다. 여러 가지의 상품을 결제했다면 각 상품의 정보를 입력하세요. 예를 들어, 구매자가 세 가지 종류의 상품을 구매했다면 배열의 길이는 3이어야 합니다.
         *
         * PayPal에서 제공하는 판매자 보호를 받고 싶다면 반드시 해당 파라미터를 사용하세요. 판매자 보호 및 위험거래 관리를 위해 PayPal에 제공돼요.
         */
        products?: Array<{
            /**
             * 상품명입니다. 최대 길이는 100자입니다.
             */
            name: string;
            /**
             * 상품의 구매 수량입니다.
             */
            quantity: number;
            /**
             * 상품의 1개의 개별 가격입니다.
             */
            unitAmount: number;
            /**
             * 결제 통화입니다.
             */
            currency: string;
            /**
             * 상품 설명입니다.
             */
            description: string;
        }> | null;
        /**
         * 배송 정보입니다.
         */
        shipping?: {
            /**
             * 수령인입니다.
             */
            fullName?: string | null;
            /**
             * 배송 주소입니다.
             */
            address?: {
                /**
                 * 구매자가 위치한 국가입니다. ISO-3166의 두 자리 국가 코드를 입력하세요.
                 */
                country: string;
                /**
                 * 주소입니다. 도로명 및 건물(Street, Apt), 번지 정보입니다.
                 */
                line1?: string | null;
                /**
                 * 상세 주소입니다. 번지 및 동호수 정보를 입력하세요.
                 */
                line2?: string | null;
                /**
                 * 주(State, Province, Region) 정보입니다. 국가의 도시 체계에 따라 없는 경우가 있습니다.
                 */
                area1?: string | null;
                /**
                 * 도시입니다.
                 */
                area2: string;
                /**
                 * 배송지 우편번호입니다. 중국, 일본, 프랑스, 독일 등 [일부 국가](https://developer.paypal.com/api/rest/reference/orders/v2/country-address-requirements/#link-countryandregionaddressrequirements)에서는 필수 파라미터입니다
                 */
                postalCode?: string | null;
            } | null;
        } | null;
        /**
         * 특정 해외간편결제 수단에만 필요한 정보입니다.
         */
        paymentMethodOptions?: {
            /**
             * PayPal 결제에 추가로 필요한 정보입니다.
             */
            paypal?: {
                /**
                 * PayPal에서 추가로 요청하는 STC(Set Transaction Context) 정보입니다. 이 정보는 토스페이먼츠에서 관리하지 않으며, PayPal에서 부정거래, 결제 취소, 환불 등 리스크 관리에 활용합니다.
                 * 결제 거래의 안전성과 신뢰성을 확보하려면 이 정보를 전달해야 합니다. [PayPal STC 문서](https://static.tosspayments.com/public/STC.pdf)를 참고해서 업종에 따라 필요한 파라미터를 추가해주세요.
                 * 문서의 표에 있는 ‘Data Field Name’ 컬럼 값을 객체의 ‘key’로, ‘Description’에 맞는 값을 객체의 ‘value’로 넣어주시면 됩니다.
                 */
                setTransactionContext?: unknown;
            } | null;
        } | null;
    } | null;
    /**
     * @ignore
     */
    subMerchantSetting?: {
        normalClientKey?: string | null;
        keyinClientKey?: string | null;
        foreignEasyPayClientKey?: string | null;
        brandpayClientKey?: string | null;
        brandpayRedirectUrl?: string | null;
    } | null;
    /**
     * @ignore
     */
    subOrders?: Array<{
        merchantBusinessNumber: string;
        merchantName: string;
        merchantAddress: {
            country: string;
            postalCode: string;
            address: string;
            detailAddress?: string | null;
        };
        orderName: string;
    }> | null;
}

interface Amount {
    /**
     * 결제 금액입니다.
     */
    value: number;
    /**
     * 결제 통화입니다. 일반결제는 `KRW`만 지원합니다. 해외 간편결제(PayPal)는 `USD`만 지원합니다.
     */
    currency: string;
}

type WithRedirection<T> = T & {
    /**
     * 결제 요청이 성공하면 리다이렉트되는 URL입니다. `https://www.example.com/success`와 같이 오리진을 포함한 형태로 설정해주세요.
     * 리다이렉트되면 URL의 쿼리 파라미터로 `amount`, `orderId`, `paymentKey`가 추가돼요.
     */
    successUrl?: string | null;
    /**
     * 결제 요청이 실패하면 리다이렉트되는 URL입니다. `https://www.example.com/fail`와 같이 오리진을 포함한 형태로 설정해주세요.
     * 리다이렉트되면 URL의 쿼리 파라미터로 에러 코드와 메시지를 확인할 수 있어요.
     */
    failUrl?: string | null;
};

type WidgetPaymentResult = {
    /**
     * 결제 타입입니다. `NORMAL`(일반결제), `BRANDPAY`(브랜드페이) 중 하나입니다.
     */
    paymentType: 'NORMAL' | 'BRANDPAY';
    /**
     * 토스페이먼츠에서 발급하는 결제 식별 키입니다. 결제 승인, 조회, 취소 등에 사용되니 반드시 저장하세요.
     */
    paymentKey: string;
    /**
     * 주문번호입니다. 결제를 요청할 때 호출한 `requestPayment()` 메서드로 넘긴 `orderId` 값과 같은지 확인하세요.
     */
    orderId: string;
    /**
     * 결제 금액 정보입니다. `requestPayment()` 메서드로 넘긴 `amount` 값과 같은지 확인하세요.
     */
    amount: Amount;
};

interface WidgetPaymentRequestWindow extends WidgetPaymentRequest {
    /**
     * 결제 금액 정보입니다.
     */
    amount: Amount;
}
interface WidgetPaymentRequestWindowOptions {
    /**
     * 결제 UI의 variantKey 정보입니다. [결제 어드민](https://dashboard.tosspayments.com/payment-widget-service/)에서 확인할 수 있어요.
     */
    variantKey?: {
        /**
         * 결제수단 UI의 variantKey입니다.
         */
        paymentMethod?: string | null;
        /**
         * 약관 UI의 variantKey입니다.
         */
        agreement?: string | null;
    } | null;
}

interface WidgetPaymentWindow {
    /**
     * 결제창 이벤트를 구독합니다. [자세히 >](#paymentwindowon)
     *
     * @param {'paymentRequest' | 'cancel'} eventName 구독할 이벤트입니다. `paymentRequest`로 구매자의 결제 요청을 받아 [widgets.requestPayment()](#widgetsrequestpayment)를 호출하고, `cancel`로 구매자가 결제를 포기한 순간을 감지할 수 있어요.
     * @param {function} callback 이벤트가 일어나면 호출되는 콜백 함수입니다. `paymentRequest`는 콜백 파라미터로 `paymentMethod` 객체가 전달돼요. 일반 결제수단은 `{ code }`, 브랜드페이는 `{ code: 'BRANDPAY', methodId }` 형태예요. `cancel`은 콜백 파라미터가 없어요.
     *
     * @throws {@link PublicError.Widgets.InvalidEventParameterError} eventName이 유효하지 않은 경우
     * @throws {@link PublicError.Widgets.InvalidCallbackParameterError} callback이 유효하지 않은 경우
     * @throws {@link PublicError.Widgets.UnknownError} 알 수 없는 오류가 발생한 경우
     */
    on: WidgetPaymentWindowOnPaymentRequest & WidgetPaymentWindowOnCancel;
    /**
     * 결제창을 제거합니다. [자세히 >](#paymentwindowdestroy)
     *
     * @example
     *  ```javascript
     *  await paymentWindow.destroy();
     * ```
     *
     * @throws {@link PublicError.Widgets.UnknownError} 알 수 없는 오류가 발생한 경우
     */
    destroy: () => Promise<void>;
}
/**
 * @docsAlias paymentRequest 이벤트
 *
 * @param {'paymentRequest'} eventName 구독할 이벤트입니다. `paymentRequest` 이벤트로 구매자의 결제 요청을 수신하세요.
 * @param {function} callback 이벤트가 일어나면 호출되는 콜백 함수입니다. `paymentRequest`는 콜백 파라미터로 `paymentMethod` 객체가 전달돼요. 일반 결제수단은 `{ code }`, 브랜드페이는 `{ code: 'BRANDPAY', methodId }` 형태예요. `cancel`은 콜백 파라미터가 없어요.
 *
 * @example
 *  ```javascript
 *  paymentWindow.on('paymentRequest', ({ paymentMethod }) => {
 *    // 결제 요청 처리
 *  });
 * ```
 */
type WidgetPaymentWindowOnPaymentRequest = (eventName: 'paymentRequest', callback: (params: {
    paymentMethod: WidgetSelectedPaymentMethod;
}) => Promise<void>) => void;
/**
 * @docsAlias cancel 이벤트
 *
 * @param {'cancel'} eventName 구독할 이벤트입니다. `cancel` 이벤트로 구매자가 결제를 포기했는지 확인하세요. 구매자가 결제창을 닫으면 결제창이 사라진 뒤에 콜백이 호출돼요. `paymentWindow.destroy()`로 결제창을 닫은 경우에는 호출되지 않아요.
 * @param {function} callback 이벤트가 일어나면 호출되는 콜백 함수입니다. `paymentRequest`는 콜백 파라미터로 `paymentMethod` 객체가 전달돼요. 일반 결제수단은 `{ code }`, 브랜드페이는 `{ code: 'BRANDPAY', methodId }` 형태예요. `cancel`은 콜백 파라미터가 없어요.
 *
 * @example
 *  ```javascript
 *  paymentWindow.on('cancel', async () => {
 *    // 구매자가 결제를 포기했을 때 처리
 *  });
 * ```
 */
type WidgetPaymentWindowOnCancel = (eventName: 'cancel', callback: () => Promise<void>) => void;

type index$8_WidgetAgreementStatus = WidgetAgreementStatus;
type index$8_WidgetAgreementWidget = WidgetAgreementWidget;
type index$8_WidgetPaymentMethodWidget = WidgetPaymentMethodWidget;
type index$8_WidgetPaymentRequest = WidgetPaymentRequest;
type index$8_WidgetPaymentRequestWindow = WidgetPaymentRequestWindow;
type index$8_WidgetPaymentRequestWindowOptions = WidgetPaymentRequestWindowOptions;
type index$8_WidgetPaymentResult = WidgetPaymentResult;
type index$8_WidgetPaymentWindow = WidgetPaymentWindow;
type index$8_WidgetSelectedPaymentMethod = WidgetSelectedPaymentMethod;
declare namespace index$8 {
  export {
    index$8_WidgetAgreementStatus as WidgetAgreementStatus,
    index$8_WidgetAgreementWidget as WidgetAgreementWidget,
    index$8_WidgetPaymentMethodWidget as WidgetPaymentMethodWidget,
    index$8_WidgetPaymentRequest as WidgetPaymentRequest,
    index$8_WidgetPaymentRequestWindow as WidgetPaymentRequestWindow,
    index$8_WidgetPaymentRequestWindowOptions as WidgetPaymentRequestWindowOptions,
    index$8_WidgetPaymentResult as WidgetPaymentResult,
    index$8_WidgetPaymentWindow as WidgetPaymentWindow,
    index$8_WidgetSelectedPaymentMethod as WidgetSelectedPaymentMethod,
  };
}

/**
 * 결제 UI 위젯을 렌더링합니다
 * @param {object} params 결제 UI 렌더링 정보입니다.
 *
 * @returns 반환되는 결제 UI 객체로 아래 메서드를 호출할 수 있어요.
 *
 * @example
 *  ```javascript
 *  const paymentMethodWidget = await widgets.renderPaymentMethods({
 *    selector: "#payment-method",
 *    variantKey: "CUSTOM-1"
    });
 * ```

 * @throws {Widgets.UserCancelError} 사용자가 결제수단 위젯 렌더링을 취소한 경우
 * @throws {@link PublicError.Widgets.NotSetupAmountError} 결제금액이 설정되지 않은 경우
 * @throws {@link PublicError.Widgets.PaymentMethodsWidgetAlreadyRenderedError} 이미 결제수단 위젯이 렌더링 된 경우
 * @throws {@link PublicError.Widgets.InvalidVariantKeyError} variantKey 가 유효하지 않은 경우
 * @throws {@link PublicError.Widgets.InvalidSelectorError} selector 가 유효하지 않은 경우
 * @throws {@link PublicError.Widgets.InvalidMethodTransactionError} 이미 다른 명령을 수행 중인 경우
 * @throws {@link PublicError.Widgets.InvalidParametersError} 파라미터가 올바르지 않은 경우
 * @throws {@link PublicError.Widgets.UnknownError} 알 수 없는 오류가 발생한 경우
 */
type RenderPaymentMethods = (params: {
    /**
     * 결제 UI를 렌더링할 위치를 지정합니다. `<div>`와 같은 HTML 요소를 선택할 수 있는 CSS 선택자를 사용합니다. 예를 들어 `<div id="payment-method">`에 결제 UI를 렌더링하려면, `#payment-method`를 전달해야 합니다.
     */
    selector: string;
    /**
     * 렌더링하고 싶은 결제 UI의 `variantKey`입니다. 2개 이상의 결제 UI를 사용하고 있다면 설정해주세요. `variantKey`는 [상점관리자의 결제 어드민](/guides/v2/payment-widget#2-결제-ui의-variantkey-확인)에서 확인할 수 있어요. 기본 값은 `DEFAULT`입니다.
     */
    variantKey?: string;
}) => Promise<WidgetPaymentMethodWidget>;

/**
 * 약관 위젯을 렌더링합니다
 * @param {object} params 약관 UI 렌더링 정보입니다.
 *
 * @returns 반환되는 약관 UI 객체로 아래 메서드를 호출할 수 있어요.
 *
 * @example
 *  ```javascript
 *  const agreementWidget = await widgets.renderAgreement({
 *    selector: "#agreement",
 *    variantKey: "AGREEMENT"
 *  });
 * ```
 *
 * @throws {@link PublicError.Widgets.UserCancelError} 사용자가 약관 위젯 렌더링을 취소한 경우
 * @throws {@link PublicError.Widgets.AgreementWidgetAlreadyRenderedError} 이미 약관 위젯이 렌더링 된 경우
 * @throws {@link PublicError.Widgets.InvalidSelectorError} selector 가 유효하지 않은 경우
 * @throws {@link PublicError.Widgets.InvalidVariantKeyError} variantKey 가 유효하지 않은 경우
 * @throws {@link PublicError.Widgets.InvalidMethodTransactionError} 이미 다른 명령을 수행 중인 경우
 * @throws {@link PublicError.Widgets.InvalidParametersError} 파라미터가 올바르지 않은 경우
 * @throws {@link PublicError.Widgets.UnknownError} 알 수 없는 오류가 발생한 경우
 */
type RenderAgreement = (params: {
    /**
     * 약관 UI를 렌더링할 위치를 지정합니다. `<div>`와 같은 HTML 요소를 선택할 수 있는 CSS 선택자를 사용합니다. 예를 들어 `<div id="agreement">`에 결제 UI를 렌더링하려면, `#agreement`를 전달해야 합니다.
     */
    selector: string;
    /**
     * 렌더링하고 싶은 약관 UI의 `variantKey`입니다. 상점관리자의 결제 어드민에서 확인할 수 있어요.
     */
    variantKey?: string;
}) => Promise<WidgetAgreementWidget>;

/**
 * 결제를 요청합니다
 * @docsDefaultSignature RequestPaymentWithRedirection
 *
 * @param {WidgetPaymentRequest} paymentRequest - 결제 요청 정보입니다.
 *
 * @returns 결제 결과
 *
 *
 * @throws {@link PublicError.Widgets.UserCancelError} 사용자가 결제를 취소한 경우
 * @throws {@link PublicError.Widgets.ProviderStatusUnhealthyError} 결제 기관의 시스템에 문제가 있을 때
 * @throws {@link PublicError.Widgets.NotSelectedPaymentMethodError} 결제수단이 선택되어있지 않은 경우
 * @throws {@link PublicError.Widgets.NeedAgreementWithRequiredTermsError} 모든 필수 약관에 동의하지 않은 경우
 * @throws {@link PublicError.Widgets.NeedCardPaymentDetailError} 신용, 체크카드 결제 시, 카드사나 할부 기간을 선택하지 않은 경우
 * @throws {@link PublicError.Widgets.NeedRefundAccountDetailError} 가상계좌 결제 시, 환불 계좌 정보를 입력하지 않은 경우
 * @throws {@link PublicError.Widgets.ExceedDepositAmountLimitError} 가상계좌 결제 시, 입금 가능한 금액보다 큰 금액을 결제한 경우
 * @throws {@link PublicError.Widgets.ExceedMaxDueDateError} 가상계좌 결제 시, 최대 유효만료 기간을 넘긴 경우
 * @throws {@link PublicError.Widgets.UnsupportedTestPhasePaymentMethodError} 테스트 환경을 지원하지 않는 결제수단을 선택한 경우
 * @throws {@link PublicError.Widgets.IncorrectSuccessUrlFormatError} successUrl이 유효하지 않은 경우
 * @throws {@link PublicError.Widgets.IncorrectFailUrlFormatError} failUrl이 유효하지 않은 경우
 * @throws {@link PublicError.Widgets.PaymentRequestFailError} 결제 요청에 실패한 경우
 * @throws {@link PublicError.Widgets.NotSupportedPromiseError} promise 방식을 지원하지 않는 환경인 경우
 * @throws {@link PublicError.Widgets.CustomPaymentMethodUnableToPayError} 커스텀 결제수단이 선택된 상태에서 결제요청을 한 경우
 * @throws {@link PublicError.Widgets.InvalidMethodTransactionError} 이미 다른 명령을 수행 중인 경우
 * @throws {@link PublicError.Widgets.InvalidMetadataError} metadata가 올바르지 않은 경우
 * @throws {@link PublicError.Widgets.InvalidParametersError} 파라미터가 올바르지 않은 경우
 * @throws {@link PublicError.Widgets.BelowZeroAmountError} 결제 금액이 0원 미만인 경우
 * @throws {@link PublicError.Widgets.UnknownError} 알 수 없는 오류가 발생한 경우
 */
type RequestPayment$2 = RequestPaymentWithPromise$1 & RequestPaymentWithRedirection$1;
/**
 * @docsAlias Promise 방식
 * @returns `WidgetPaymentResult` 객체가 응답됩니다. 객체 필드를 확인하고 [결제 승인 API](/reference#결제-승인)를 호출해야 결제가 최종적으로 완료돼요.
 * @param {WidgetPaymentRequest} paymentRequest 결제 요청 정보입니다.
 *
 * @example
 *  ```js
 *  widgets.requestPayment({
      orderId: generateRandomString(),
      orderName: "토스 티셔츠 외 2건",
      customerEmail: "customer123@gmail.com",
      customerName: "김토스",
    });
 * ```

 */
type RequestPaymentWithPromise$1 = (paymentRequest: WidgetPaymentRequest) => Promise<WidgetPaymentResult>;
/**
 * @docsAlias Redirect 방식
 *
 * @returns 결제 요청이 성공하면 파라미터로 설정한 `successUrl`로 이동해요. 쿼리 파라미터의 `amount` 값이 메서드 파라미터로 설정한 `amount`와 같은지 반드시 확인하고 [결제 승인 API](/reference#결제-승인)를 호출해서 결제를 완료하세요.
 * ```plain theme="grey" copyable="false"
 * {successUrl}?paymentType={PAYMENT_TYPE}&amount={AMOUNT}&orderId={ORDER_ID}&paymentKey={PAYMENT_KEY}
 * ```
 * 결제 요청이 실패하면 파라미터로 설정한 `failUrl`로 이동해요. 쿼리 파라미터로 에러 코드와 메시지를 확인하세요.
 * ```plain theme="grey" copyable="false"
 * {failUrl}?code={ERROR_CODE}&message={ERROR_MESSAGE}&orderId={ORDER_ID}
 * ```
 * Redirect 방식에서는 URL이 이동하기 때문에 `void`가 응답됩니다.

 * @param {WidgetPaymentRequest} paymentRequest 결제 요청 정보입니다.
 *
 * @example
 *  ```js
 *  widgets.requestPayment({
      orderId: generateRandomString(),
      orderName: "토스 티셔츠 외 2건",
      successUrl: window.location.origin + "/success.html",
      failUrl: window.location.origin + "/fail.html",
      customerEmail: "customer123@gmail.com",
      customerName: "김토스",
    });
 * ```
 */
type RequestPaymentWithRedirection$1 = (paymentRequest: WithRedirection<WidgetPaymentRequest>) => Promise<void>;

/**
 * 결제 금액을 변경합니다
 *
 * @param {Amount} amount 결제 금액 정보입니다.
 *
 * @example
 *  ```javascript
 *  widgets.setAmount({
 *    currency: 'KRW',
 *    value: amount,
 *  });
 * ```
 *
 * @throws {@link PublicError.Widgets.InvalidAmountValueError} 결제 금액이 유효하지 않은 경우
 * @throws {@link PublicError.Widgets.InvalidAmountCurrencyError} 결제 금액의 통화가 유효하지 않은 경우
 * @throws {@link PublicError.Widgets.InvalidParametersError} 파라미터가 올바르지 않은 경우
 * @throws {@link PublicError.Widgets.UnknownError} 알 수 없는 오류가 발생한 경우
 */
type SetAmount = (amount: Amount) => Promise<void>;

/**
 * 결제창을 통해 결제를 요청합니다
 * @docsDefaultSignature RequestPaymentWindowWithRedirection
 *
 * @param {WidgetPaymentRequestWindow} paymentRequest - 결제 요청 정보입니다.
 * @param {WidgetPaymentRequestWindowOptions} [options] - 위젯 결제창 옵션입니다.
 *
 * @returns 결제 결과
 *
 *
 * @throws {@link PublicError.Widgets.UserCancelError} 사용자가 결제를 취소한 경우
 * @throws {@link PublicError.Widgets.InvalidVariantKeyError} variantKey 가 유효하지 않은 경우
 * @throws {@link PublicError.Widgets.ProviderStatusUnhealthyError} 결제 기관의 시스템에 문제가 있을 때
 * @throws {@link PublicError.Widgets.UnsupportedTestPhasePaymentMethodError} 테스트 환경을 지원하지 않는 결제수단을 선택한 경우
 * @throws {@link PublicError.Widgets.IncorrectSuccessUrlFormatError} successUrl이 유효하지 않은 경우
 * @throws {@link PublicError.Widgets.IncorrectFailUrlFormatError} failUrl이 유효하지 않은 경우
 * @throws {@link PublicError.Widgets.PaymentRequestFailError} 결제 요청에 실패한 경우
 * @throws {@link PublicError.Widgets.NotSupportedPromiseError} promise 방식을 지원하지 않는 환경인 경우
 * @throws {@link PublicError.Widgets.InvalidMethodTransactionError} 이미 다른 명령을 수행 중인 경우
 * @throws {@link PublicError.Widgets.InvalidMetadataError} metadata가 올바르지 않은 경우
 * @throws {@link PublicError.Widgets.InvalidParametersError} 파라미터가 올바르지 않은 경우
 * @throws {@link PublicError.Widgets.BelowZeroAmountError} 결제 금액이 0원 미만인 경우
 * @throws {@link PublicError.Widgets.UnknownError} 알 수 없는 오류가 발생한 경우
 */
type RequestPaymentWindow = RequestPaymentWindowWithPromise & RequestPaymentWindowWithRedirection;
/**
 * @docsAlias Promise 방식
 * @returns `WidgetPaymentResult` 객체가 응답됩니다. 객체 필드를 확인하고 [결제 승인 API](/reference#결제-승인)를 호출해야 결제가 최종적으로 완료돼요.
 * @param {WidgetPaymentRequestWindow} paymentRequest 결제 요청 정보입니다.
 * @param {WidgetPaymentRequestWindowOptions} [options] 위젯 결제창 옵션입니다.
 *
 * @example
 *  ```js
 *  widgets.requestPaymentWindow(
 *    {
 *      orderId: generateRandomString(),
 *      orderName: "토스 티셔츠 외 2건",
 *      customerEmail: "customer123@gmail.com",
 *      customerName: "김토스",
 *    },
 *    {
 *      variantKey: {
 *        paymentMethod: "CUSTOM-1",
 *        agreement: "AGREEMENT",
 *      },
 *    }
 *  );
 * ```
 *
 */
type RequestPaymentWindowWithPromise = (paymentRequest: WidgetPaymentRequestWindow, options?: WidgetPaymentRequestWindowOptions) => Promise<WidgetPaymentResult>;
/**
 * @docsAlias Redirect 방식
 *
 * @returns 결제 요청이 성공하면 파라미터로 설정한 `successUrl`로 이동해요. 쿼리 파라미터의 `amount` 값이 메서드 파라미터로 설정한 `amount`와 같은지 반드시 확인하고 [결제 승인 API](/reference#결제-승인)를 호출해서 결제를 완료하세요.
 * ```plain theme="grey" copyable="false"
 * {successUrl}?paymentType={PAYMENT_TYPE}&amount={AMOUNT}&orderId={ORDER_ID}&paymentKey={PAYMENT_KEY}
 * ```
 * 결제 요청이 실패하면 파라미터로 설정한 `failUrl`로 이동해요. 쿼리 파라미터로 에러 코드와 메시지를 확인하세요.
 * ```plain theme="grey" copyable="false"
 * {failUrl}?code={ERROR_CODE}&message={ERROR_MESSAGE}&orderId={ORDER_ID}
 * ```
 * Redirect 방식에서는 URL이 이동하기 때문에 `void`가 응답됩니다.

 * @param {WidgetPaymentRequestWindow} paymentRequest 결제 요청 정보입니다.
 * @param {WidgetPaymentRequestWindowOptions} [options] 위젯 결제창 옵션입니다.
 *
 * @example
 *  ```js
 *  widgets.requestPaymentWindow(
 *    {
 *      orderId: generateRandomString(),
 *      orderName: "토스 티셔츠 외 2건",
 *      successUrl: window.location.origin + "/success.html",
 *      failUrl: window.location.origin + "/fail.html",
 *      customerEmail: "customer123@gmail.com",
 *      customerName: "김토스",
 *    },
 *    {
 *      variantKey: {
 *        paymentMethod: "CUSTOM-1",
 *        agreement: "AGREEMENT",
 *      },
 *    }
 *  );
 * ```
 */
type RequestPaymentWindowWithRedirection = (paymentRequest: WithRedirection<WidgetPaymentRequestWindow>, options?: WidgetPaymentRequestWindowOptions) => Promise<void>;

/**
 * 결제창을 렌더링합니다
 * @param {object} [params] 결제창 렌더링 정보입니다. 생략할 수 있어요.
 *
 * @returns 아래 메서드를 호출할 수 있는 결제창 객체를 Promise로 반환해요.
 *
 * @example
 *  ```javascript
 *  const paymentWindow = await widgets.renderPaymentWindow({
 *    orderName: "토스 티셔츠 외 2건",
 *    variantKey: {
 *      paymentMethod: "CUSTOM-1",
 *      agreement: "AGREEMENT",
 *    },
 *  });
 * ```
 *
 * @throws {@link PublicError.Widgets.PaymentWindowAlreadyRenderedError} 이미 결제창이 렌더링 된 경우
 * @throws {@link PublicError.Widgets.UserCancelError} 사용자가 결제창 렌더링을 취소한 경우
 * @throws {@link PublicError.Widgets.NotSetupAmountError} 결제금액이 설정되지 않은 경우
 * @throws {@link PublicError.Widgets.InvalidVariantKeyError} variantKey가 유효하지 않은 경우
 * @throws {@link PublicError.Widgets.InvalidMethodTransactionError} 이미 다른 명령을 수행 중인 경우
 * @throws {@link PublicError.Widgets.InvalidParametersError} 파라미터가 올바르지 않은 경우
 * @throws {@link PublicError.Widgets.UnknownError} 알 수 없는 오류가 발생한 경우
 */
type RenderPaymentWindow = (params?: {
    /**
     * 구매상품입니다. 예를 들면 `생수 외 1건` 같은 형식입니다. 최대 길이는 100자입니다.
     * 결제창에 표시돼요. [widgets.requestPayment()](#widgetsrequestpayment)에 전달하는 `orderName`과 같은 값이어야 해요. 다르면 `requestPayment()`에서 `InvalidParametersError`가 발생해요.
     */
    orderName?: string;
    /**
     * 결제 UI의 variantKey 정보입니다. [결제 어드민](https://dashboard.tosspayments.com/payment-widget-service/)에서 확인할 수 있어요.
     */
    variantKey?: {
        /**
         * 결제수단 UI의 variantKey입니다.
         */
        paymentMethod?: string;
        /**
         * 약관 UI의 variantKey입니다.
         */
        agreement?: string;
    };
}) => Promise<WidgetPaymentWindow>;

/**
 * SDK 에서 가맹점에게 던지는 에러들을 모아둡니다
 *
 * @see {@link https://docs.tosspayments.com/sdk/error-codes}
 */
declare class PublicInterfaceError extends Error {
    /**
     * 가맹점에게 전달되는 에러 코드
     *
     * @see {@link https://docs.tosspayments.com/sdk/error-codes}
     */
    code: string;
    constructor(message: string, options: {
        code: string;
    });
}

/**
 * renderAgreement()를 실행했을 때 이미 약관 위젯이 존재할 경우 발생합니다.
 */
declare class AgreementWidgetAlreadyRenderedError extends PublicInterfaceError {
    constructor();
}

/**
 * renderPaymentMethods() 또는 setAmount()에 넘긴 결제금액 값이 0보다 작거나 같을 때 발생합니다.
 */
declare class BelowZeroAmountError$2 extends PublicInterfaceError {
    constructor();
}

/**
 * requestPayment()를 호출하기 전에 getSelectedPaymentMethod()를 호출하여 커스텀 결제수단에 대한 처리를 진행하지 않았을 때 발생합니다.
 */
declare class CustomPaymentMethodUnableToPayError extends PublicInterfaceError {
    constructor();
}

/**
 * 가상계좌 결제에서 입금할 수 있는 금액보다 amount 값이 크면 발생합니다.
 */
declare class ExceedDepositAmountLimitError extends PublicInterfaceError {
    constructor();
}

/**
 * 가상 계좌의 최대 유효만료 기간을 초과했을 때 발생합니다.
 */
declare class ExceedMaxDueDateError extends PublicInterfaceError {
    constructor();
}

/**
 * failUrl이 올바른 형식이 아닐 때 발생합니다.
 */
declare class IncorrectFailUrlFormatError$2 extends PublicInterfaceError {
    constructor();
}

/**
 * pendingUrl이 올바른 형식이 아닐 때 발생합니다.
 */
declare class IncorrectPendingUrlFormatError$1 extends PublicInterfaceError {
    constructor();
}

/**
 * successUrl이 올바른 형식이 아닐 때 발생합니다.
 */
declare class IncorrectSuccessUrlFormatError$2 extends PublicInterfaceError {
    constructor();
}

/**
 * customer key에 secret key를 사용한 경우 발생합니다.
 */
declare class InsecureKeyUsageError$2 extends PublicInterfaceError {
    constructor();
}

/**
 * renderPaymentMethods()에서 지원하지 않는 통화를 사용하면 발생합니다. 현재는 KRW, USD만 지원합니다.
 */
declare class InvalidAmountCurrencyError$1 extends PublicInterfaceError {
    constructor();
}

/**
 * renderPaymentMethods() 또는 setAmount()에 넘긴 결제금액 값이 숫자가 아니면 발생합니다.
 */
declare class InvalidAmountValueError$2 extends PublicInterfaceError {
    constructor();
}

/**
 * on 메서드에서 이벤트 callback 파라미터가 함수가 아니면 발생합니다.
 */
declare class InvalidCallbackParameterError extends PublicInterfaceError {
    constructor();
}

/**
 * clientKey가 유효하지 않을 때 발생합니다.
 */
declare class InvalidClientKeyError$2 extends PublicInterfaceError {
    constructor();
}

/**
 * customerKey가 올바르지 않을 때 발생합니다.
 */
declare class InvalidCustomerKeyError$2 extends PublicInterfaceError {
    constructor();
}

/**
 * on 메서드에서 지원하지 않는 이벤트 이름을 사용하면 발생합니다.
 */
declare class InvalidEventParameterError extends PublicInterfaceError {
    constructor({ eventName }: {
        eventName: string;
    });
}

/**
 * metadata가 올바르지 않을 경우 발생합니다.
 */
declare class InvalidMetadataError$2 extends PublicInterfaceError {
    constructor();
}

/**
 * 이미 다른 명령을 수행하고 있을 때 발생합니다.
 */
declare class InvalidMethodTransactionError$2 extends PublicInterfaceError {
    constructor();
}

/**
 * 입력된 파라미터가 올바르지 않을 경우 발생합니다.
 */
declare class InvalidParametersError$2 extends PublicInterfaceError {
    constructor(message: string);
}

/**
 * renderPaymentMethods()를 실행했을 때 CSS 선택자를 찾을 수 없을 때 발생합니다.
 */
declare class InvalidSelectorError extends PublicInterfaceError {
    constructor();
}

/**
 * renderPaymentMethods()를 실행했을 때 유효하지 않은 variantKey 를 넘겨주었을 때 발생합니다.
 */
declare class InvalidVariantKeyError extends PublicInterfaceError {
    constructor();
}

/**
 * requestPayment()를 실행했을 때 모든 필수 약관에 동의 되어있지 않으면 발생합니다.
 */
declare class NeedAgreementWithRequiredTermsError extends PublicInterfaceError {
    constructor();
}

/**
 * 신용・체크카드 결제에서 카드사 또는 할부기간을 선택하지 않은 상태로 requestPayment()를 호출하면 발생합니다.
 */
declare class NeedCardPaymentDetailError extends PublicInterfaceError {
    constructor();
}

/**
 * 가상계좌 결제에서 환불 계좌 정보(은행, 예금주, 계좌번호)를 하나라도 입력하지 않은 상태로 requestPayment()를 호출하면 발생합니다.
 */
declare class NeedRefundAccountDetailError extends PublicInterfaceError {
    constructor();
}

/**
 * requestPayment()를 실행했을 때 선택된 결제수단이 없으면 발생합니다.
 */
declare class NotSelectedPaymentMethodError extends PublicInterfaceError {
    constructor();
}

/**
 * renderPaymentMethods() 또는 requestPayment() 가 호출된 시점에, 결제금액이 설정되지 않았다면 발생합니다.
 */
declare class NotSetupAmountError extends PublicInterfaceError {
    constructor();
}

declare class NotSupportedAPIIndividualKeyError extends PublicInterfaceError {
    constructor();
}

/**
 * 결제창에서 결제 요청 버튼을 눌렀을 때, paymentRequest 이벤트 핸들러가 등록되지 않은 경우 발생합니다.
 */
declare class NotRegisteredPaymentRequestHandlerError extends PublicInterfaceError {
    constructor();
}

/**
 * Promise 방식을 지원하지 않을 때 발생합니다.
 */
declare class NotSupportedPromiseError$1 extends PublicInterfaceError {
    constructor();
}

/**
 * renderPaymentMethods()를 실행했을 때 이미 결제수단 위젯이 존재할 경우 발생합니다.
 */
declare class PaymentMethodsWidgetAlreadyRenderedError extends PublicInterfaceError {
    constructor();
}

/**
 * 결제에 실패했을 때 발생하는 에러입니다.
 */
declare class PaymentRequestFailError$2 extends PublicInterfaceError {
    readonly orderId: string;
    constructor(message: string, { orderId, code }: {
        code: string;
        orderId: string;
    });
}

/**
 * renderPaymentWindow()를 실행했을 때 이미 결제창이 존재할 경우 발생합니다.
 */
declare class PaymentWindowAlreadyRenderedError extends PublicInterfaceError {
    constructor();
}

/**
 * 결제 기관의 시스템에 문제가 있을 때 발생합니다. 정확한 원인은 결제 기관에 문의해주세요.
 */
declare class ProviderStatusUnhealthyError extends PublicInterfaceError {
    constructor();
}

/**
 * 실행 중, 정의되지 않은 에러가 발생했을 때 발생하는 에러입니다.
 */
declare class UnknownError$2 extends PublicInterfaceError {
    constructor();
}

/**
 * 테스트 환경을 지원하지 않는 결제수단을 선택했을 때 발생합니다.
 */
declare class UnsupportedTestPhasePaymentMethodError extends PublicInterfaceError {
    constructor();
}

/**
 * 사용자가 제품 창을 닫았을 때 발생하는 에러입니다.
 */
declare class UserCancelError$2 extends PublicInterfaceError {
    constructor();
}

/**
 * v1 메서드는 v2 에서 지원하지 않습니다.
 * 잘못 연동하고 있다는 피드백을 빨리 줄 수 있도록 에러를 명확하게 던집니다.
 */
declare class V1MethodNotSupportedError$2 extends PublicInterfaceError {
    constructor();
}

/**
 * 서버와 통신하는 중 네트워크 오류가 발생했을 때 발생하는 에러입니다.
 */
declare class NetworkError$2 extends PublicInterfaceError {
    constructor();
}

type index$7_AgreementWidgetAlreadyRenderedError = AgreementWidgetAlreadyRenderedError;
declare const index$7_AgreementWidgetAlreadyRenderedError: typeof AgreementWidgetAlreadyRenderedError;
type index$7_CustomPaymentMethodUnableToPayError = CustomPaymentMethodUnableToPayError;
declare const index$7_CustomPaymentMethodUnableToPayError: typeof CustomPaymentMethodUnableToPayError;
type index$7_ExceedDepositAmountLimitError = ExceedDepositAmountLimitError;
declare const index$7_ExceedDepositAmountLimitError: typeof ExceedDepositAmountLimitError;
type index$7_ExceedMaxDueDateError = ExceedMaxDueDateError;
declare const index$7_ExceedMaxDueDateError: typeof ExceedMaxDueDateError;
type index$7_InvalidCallbackParameterError = InvalidCallbackParameterError;
declare const index$7_InvalidCallbackParameterError: typeof InvalidCallbackParameterError;
type index$7_InvalidEventParameterError = InvalidEventParameterError;
declare const index$7_InvalidEventParameterError: typeof InvalidEventParameterError;
type index$7_InvalidSelectorError = InvalidSelectorError;
declare const index$7_InvalidSelectorError: typeof InvalidSelectorError;
type index$7_InvalidVariantKeyError = InvalidVariantKeyError;
declare const index$7_InvalidVariantKeyError: typeof InvalidVariantKeyError;
type index$7_NeedAgreementWithRequiredTermsError = NeedAgreementWithRequiredTermsError;
declare const index$7_NeedAgreementWithRequiredTermsError: typeof NeedAgreementWithRequiredTermsError;
type index$7_NeedCardPaymentDetailError = NeedCardPaymentDetailError;
declare const index$7_NeedCardPaymentDetailError: typeof NeedCardPaymentDetailError;
type index$7_NeedRefundAccountDetailError = NeedRefundAccountDetailError;
declare const index$7_NeedRefundAccountDetailError: typeof NeedRefundAccountDetailError;
type index$7_NotRegisteredPaymentRequestHandlerError = NotRegisteredPaymentRequestHandlerError;
declare const index$7_NotRegisteredPaymentRequestHandlerError: typeof NotRegisteredPaymentRequestHandlerError;
type index$7_NotSelectedPaymentMethodError = NotSelectedPaymentMethodError;
declare const index$7_NotSelectedPaymentMethodError: typeof NotSelectedPaymentMethodError;
type index$7_NotSetupAmountError = NotSetupAmountError;
declare const index$7_NotSetupAmountError: typeof NotSetupAmountError;
type index$7_NotSupportedAPIIndividualKeyError = NotSupportedAPIIndividualKeyError;
declare const index$7_NotSupportedAPIIndividualKeyError: typeof NotSupportedAPIIndividualKeyError;
type index$7_PaymentMethodsWidgetAlreadyRenderedError = PaymentMethodsWidgetAlreadyRenderedError;
declare const index$7_PaymentMethodsWidgetAlreadyRenderedError: typeof PaymentMethodsWidgetAlreadyRenderedError;
type index$7_PaymentWindowAlreadyRenderedError = PaymentWindowAlreadyRenderedError;
declare const index$7_PaymentWindowAlreadyRenderedError: typeof PaymentWindowAlreadyRenderedError;
type index$7_ProviderStatusUnhealthyError = ProviderStatusUnhealthyError;
declare const index$7_ProviderStatusUnhealthyError: typeof ProviderStatusUnhealthyError;
type index$7_UnsupportedTestPhasePaymentMethodError = UnsupportedTestPhasePaymentMethodError;
declare const index$7_UnsupportedTestPhasePaymentMethodError: typeof UnsupportedTestPhasePaymentMethodError;
declare namespace index$7 {
  export {
    index$7_AgreementWidgetAlreadyRenderedError as AgreementWidgetAlreadyRenderedError,
    BelowZeroAmountError$2 as BelowZeroAmountError,
    index$7_CustomPaymentMethodUnableToPayError as CustomPaymentMethodUnableToPayError,
    index$7_ExceedDepositAmountLimitError as ExceedDepositAmountLimitError,
    index$7_ExceedMaxDueDateError as ExceedMaxDueDateError,
    IncorrectFailUrlFormatError$2 as IncorrectFailUrlFormatError,
    IncorrectPendingUrlFormatError$1 as IncorrectPendingUrlFormatError,
    IncorrectSuccessUrlFormatError$2 as IncorrectSuccessUrlFormatError,
    InsecureKeyUsageError$2 as InsecureKeyUsageError,
    InvalidAmountCurrencyError$1 as InvalidAmountCurrencyError,
    InvalidAmountValueError$2 as InvalidAmountValueError,
    index$7_InvalidCallbackParameterError as InvalidCallbackParameterError,
    InvalidClientKeyError$2 as InvalidClientKeyError,
    InvalidCustomerKeyError$2 as InvalidCustomerKeyError,
    index$7_InvalidEventParameterError as InvalidEventParameterError,
    InvalidMetadataError$2 as InvalidMetadataError,
    InvalidMethodTransactionError$2 as InvalidMethodTransactionError,
    InvalidParametersError$2 as InvalidParametersError,
    index$7_InvalidSelectorError as InvalidSelectorError,
    index$7_InvalidVariantKeyError as InvalidVariantKeyError,
    index$7_NeedAgreementWithRequiredTermsError as NeedAgreementWithRequiredTermsError,
    index$7_NeedCardPaymentDetailError as NeedCardPaymentDetailError,
    index$7_NeedRefundAccountDetailError as NeedRefundAccountDetailError,
    NetworkError$2 as NetworkError,
    index$7_NotRegisteredPaymentRequestHandlerError as NotRegisteredPaymentRequestHandlerError,
    index$7_NotSelectedPaymentMethodError as NotSelectedPaymentMethodError,
    index$7_NotSetupAmountError as NotSetupAmountError,
    index$7_NotSupportedAPIIndividualKeyError as NotSupportedAPIIndividualKeyError,
    NotSupportedPromiseError$1 as NotSupportedPromiseError,
    index$7_PaymentMethodsWidgetAlreadyRenderedError as PaymentMethodsWidgetAlreadyRenderedError,
    PaymentRequestFailError$2 as PaymentRequestFailError,
    index$7_PaymentWindowAlreadyRenderedError as PaymentWindowAlreadyRenderedError,
    index$7_ProviderStatusUnhealthyError as ProviderStatusUnhealthyError,
    UnknownError$2 as UnknownError,
    index$7_UnsupportedTestPhasePaymentMethodError as UnsupportedTestPhasePaymentMethodError,
    UserCancelError$2 as UserCancelError,
    V1MethodNotSupportedError$2 as V1MethodNotSupportedError,
  };
}

interface TossPaymentsWidgets {
    /**
     * 주문의 결제 금액을 설정합니다. [자세히 >](#widgetssetamount)
     */
    setAmount: SetAmount;
    /**
     * 결제 UI를 렌더링합니다. [자세히 >](#widgetsrenderpaymentmethods)
     */
    renderPaymentMethods: RenderPaymentMethods;
    /**
     * 결제를 요청합니다. 구매자가 결제 UI에서 선택한 결제수단의 결제창을 띄워요. [자세히 >](#widgetsrequestpayment)
     */
    requestPayment: RequestPayment$2;
    /**
     *
     * 위젯 결제창으로 결제를 요청합니다. [자세히 >](#widgetsrequestpaymentwindow)
     * @deprecated renderPaymentWindow API로 대체됩니다.
     * @ignore
     */
    requestPaymentWindow: RequestPaymentWindow;
    /**
     * 약관 UI를 렌더링합니다. [자세히 >](#widgetsrenderagreement)
     */
    renderAgreement: RenderAgreement;
    /**
     * 결제창을 렌더링합니다. [자세히 >](#widgetsrenderpaymentwindow)
     */
    renderPaymentWindow: RenderPaymentWindow;
}

type index$6_TossPaymentsWidgets = TossPaymentsWidgets;
type index$6_WidgetAgreementStatus = WidgetAgreementStatus;
type index$6_WidgetAgreementWidget = WidgetAgreementWidget;
type index$6_WidgetPaymentMethodWidget = WidgetPaymentMethodWidget;
type index$6_WidgetPaymentWindow = WidgetPaymentWindow;
type index$6_WidgetSelectedPaymentMethod = WidgetSelectedPaymentMethod;
declare namespace index$6 {
  export {
    index$7 as Errors,
    index$8 as Models,
    index$6_TossPaymentsWidgets as TossPaymentsWidgets,
    index$6_WidgetAgreementStatus as WidgetAgreementStatus,
    index$6_WidgetAgreementWidget as WidgetAgreementWidget,
    index$6_WidgetPaymentMethodWidget as WidgetPaymentMethodWidget,
    index$6_WidgetPaymentWindow as WidgetPaymentWindow,
    index$6_WidgetSelectedPaymentMethod as WidgetSelectedPaymentMethod,
  };
}

interface BrandpayAmount extends Amount {
    /**
     * 결제 통화입니다. 브랜드페이는 `KRW` 결제만 지원합니다.
     */
    currency: 'KRW';
}

interface BrandpayPaymentRequest {
    /**
     * 결제 금액 정보입니다.
     */
    amount: BrandpayAmount;
    /**
     * 주문번호입니다. 각 주문을 구분하는 무작위한 고유값을 생성하세요. 영문 대소문자, 숫자, 특수문자 `-`, `_`, `=`로 이루어진 6자 이상 64자 이하의 문자열이어야 합니다.
     */
    orderId: string;
    /**
     * 구매상품입니다. 예를 들면 `생수 외 1건` 같은 형식입니다. 최대 길이는 100자입니다.
     */
    orderName: string;
    /**
     * 구매자 이메일입니다. 결제 상태가 바뀌면 이메일 주소로 결제내역이 전송됩니다. 최대 길이는 100자입니다.
     */
    customerEmail?: string | null;
    /**
     * 구매자명입니다. 최대 길이는 100자입니다.
     */
    customerName?: string | null;
    /**
     * 결제 금액 중 면세 금액입니다. 면세 상점 혹은 복합 과세 상점으로 계약된 상점만 사용하세요. 자세한 내용은 세금 처리 가이드에서 확인하세요.
     */
    taxFreeAmount?: number | null;
    /**
     * 결제수단의 ID입니다. 결제수단 ID 입니다. 등록되어 있는 결제수단 중 하나를 지정해서 바로 결제하고 싶을 때 사용합니다.
     */
    methodId?: string | null;
    /**
     * 결제 관련 정보를 추가할 수 있는 객체입니다. 최대 5개의 키-값(key-value) 쌍을 자유롭게 추가해주세요. 키는 `[` , `]` 를 사용하지 않는 최대 40자의 문자열, 값은 최대 2000자의 문자열입니다.
     */
    metadata?: Record<string | symbol | number, unknown> | null;
    /**
     * @ignore
     */
    shippingAddress?: string | null;
    /**
     * 구매자가 카드를 선택하면 결제에 적용되는 옵션입니다.
     */
    card?: {
        /**
         * 신용 카드의 할부 개월 수입니다. 값을 넣으면 해당 할부 개월 수로 결제가 진행됩니다.
         * 2부터 12사이의 값을 사용할 수 있고, 0이 들어가면 할부가 아닌 일시불로 결제됩니다.
         * 결제 금액(amount)이 5만원 이상일 때만 할부가 적용됩니다.
         */
        cardInstallmentPlan?: number | null;
        /**
         * 카드사 포인트 사용 여부입니다.
         * 값을 주지 않거나 값이 false라면 사용자가 카드사 포인트 사용 여부를 결정할 수 있습니다. 이 값을 true로 주면 카드사 포인트 사용이 체크된 상태로 결제창이 열립니다.
         *
         * \* 추가 계약이 필요한 파라미터입니다. 토스페이먼츠 고객센터(1544-7772, support@tosspayments.com)로 문의해주세요.
         */
        useCardPoint?: boolean | null;
        /**
         * 카드 즉시 할인 코드입니다. methodId 파라미터가 있을 경우 적용됩니다.
         * [카드 프로모션 조회 API](https://docs.tosspayments.com/reference/brandpay#%EC%B9%B4%EB%93%9C-%ED%94%84%EB%A1%9C%EB%AA%A8%EC%85%98-%EC%A1%B0%ED%9A%8C)로 적용할 수 있는 할인 코드의 목록을 조회할 수 있습니다.
         */
        discountCode?: string | null;
        /**
         * @ignore
         */
        affiliateCards?: Array<{
            issuerCode: string;
            cardProductCode: string;
        }> | null;
        /**
         * @ignore
         */
        orderProductCode?: string | null;
        /**
         * @ignore
         */
        dividedSettlements?: Array<{
            subMid: string;
            amount: number;
            taxFreeAmount: number;
            productInfo: string;
        }> | null;
    } | null;
    /**
     * 구매자가 계좌를 선택하면 결제에 적용되는 옵션입니다.
     */
    transfer?: {
        /**
         * 현금영수증 발급 정보를 담는 객체입니다.
         */
        cashReceipt?: CashReceipt | null;
        /**
         * 문화비(도서, 공연 티켓, 박물관·미술관 입장권 등) 지출 여부입니다.
         */
        isCulturalExpenses?: boolean | null;
        /**
         * 계좌 즉시 할인 코드입니다. methodId 파라미터가 있을 경우 적용됩니다.
         * [계좌 프로모션 조회 API](https://docs.tosspayments.com/reference/brandpay#%EA%B3%84%EC%A2%8C-%ED%94%84%EB%A1%9C%EB%AA%A8%EC%85%98-%EC%A1%B0%ED%9A%8C)로 적용할 수 있는 할인 코드의 목록을 조회할 수 있습니다.
         */
        discountCode?: string | null;
        /**
         * @ignore
         */
        orderProductCode?: string | null;
        /**
         * @ignore
         */
        dividedSettlements?: Array<{
            subMid: string;
            amount: number;
            taxFreeAmount: number;
            productInfo: string;
        }> | null;
    } | null;
}
interface BasicCashReceipt {
    type: '소득공제' | '지출증빙' | '미발행';
    registrationNumber?: string;
    registrationNumberType?: 'CASH_RECEIPT_CARD' | 'BUSINESS_REGISTRATION' | 'MOBILE';
}
interface 소득공제_현금영수증 extends BasicCashReceipt {
    type: '소득공제';
    registrationNumberType: 'MOBILE' | 'CASH_RECEIPT_CARD';
    registrationNumber: string;
}
interface 지출증빙_현금영수증 extends BasicCashReceipt {
    type: '지출증빙';
    registrationNumberType: 'BUSINESS_REGISTRATION' | 'CASH_RECEIPT_CARD';
    registrationNumber: string;
}
interface 미발행 extends BasicCashReceipt {
    type: '미발행';
    registrationNumberType?: never;
    registrationNumber?: never;
}
type CashReceipt = 소득공제_현금영수증 | 지출증빙_현금영수증 | 미발행;

interface BrandpayRequestPaymentResult {
    /**
     * 토스페이먼츠에서 발급하는 결제 식별 키입니다. 결제 승인, 조회, 취소 등에 사용되니 반드시 저장하세요.
     */
    paymentKey: string;
    /**
     * 주문번호입니다. 결제를 요청할 때 호출한 `requestPayment()` 메서드로 넘긴 `orderId` 값과 같은지 확인하세요.
     */
    orderId: string;
    /**
     * 결제 금액 정보입니다. `requestPayment()` 메서드로 넘긴 `amount` 값과 같은지 확인하세요.
     */
    amount: BrandpayAmount;
}

type index$5_BrandpayAmount = BrandpayAmount;
type index$5_BrandpayPaymentRequest = BrandpayPaymentRequest;
type index$5_BrandpayRequestPaymentResult = BrandpayRequestPaymentResult;
declare namespace index$5 {
  export {
    index$5_BrandpayAmount as BrandpayAmount,
    index$5_BrandpayPaymentRequest as BrandpayPaymentRequest,
    index$5_BrandpayRequestPaymentResult as BrandpayRequestPaymentResult,
  };
}

/**
 * 결제를 요청합니다
 * @docsDefaultSignature RequestPaymentWithRedirection
 *
 * @param {WithRedirection<BrandpayPaymentRequest> | BrandpayPaymentRequest} paymentRequest - 결제 요청 정보
 *
 *
 * @throws {@link PublicError.Brandpay.UserCancelError} 사용자가 결제를 취소한 경우
 * @throws {@link PublicError.Brandpay.InvalidAmountValueError} 결제 금액이 유효하지 않은 경우
 * @throws {@link PublicError.Brandpay.BelowZeroAmountError} 결제 금액이 0원 미만인 경우
 * @throws {@link PublicError.Brandpay.IncorrectSuccessUrlFormatError} successUrl이 유효하지 않은 경우
 * @throws {@link PublicError.Brandpay.IncorrectFailUrlFormatError} failUrl이 유효하지 않은 경우
 * @throws {@link PublicError.Brandpay.PaymentRequestFailError} 결제 요청에 실패한 경우
 * @throws {@link PublicError.Brandpay.NotRegisteredRedirectUrlError} redirectUrl이 등록되지 않은 경우
 * @throws {@link PublicError.Brandpay.InvalidMethodTransactionError} 이미 다른 명령을 수행 중인 경우
 * @throws {@link PublicError.Brandpay.InvalidMetadataError} metadata가 올바르지 않은 경우
 * @throws {@link PublicError.Brandpay.InvalidParametersError} 파라미터가 올바르지 않은 경우
 * @throws {@link PublicError.Brandpay.UnknownError} 알 수 없는 오류가 발생한 경우
 */
type RequestPayment$1 = RequestPaymentWithPromise & RequestPaymentWithRedirection;
/**
 * @docsAlias Redirect 방식
 * @returns 결제 요청이 성공하면 파라미터로 설정한 `successUrl`로 이동해요. 쿼리 파라미터의 `amount` 값이 메서드 파라미터로 설정한 `amount`와 같은지 반드시 확인하고 [브랜드페이 결제 승인 API](/reference/brandpay#결제-승인)를 호출해서 결제를 완료하세요.
 * ```plain theme="grey" copyable="false"
 * {successUrl}?amount={AMOUNT}&orderId={ORDER_ID}&paymentKey={PAYMENT_KEY}
 * ```
 * 결제 요청이 실패하면 파라미터로 설정한 `failUrl`로 이동해요. 쿼리 파라미터로 에러 코드와 메시지를 확인하세요.
 * ```plain theme="grey" copyable="false"
 * {failUrl}?code={ERROR_CODE}&message={ERROR_MESSAGE}&orderId={ORDER_ID}
 * ```
 * Redirect 방식에서는 URL이 이동하기 때문에 `void`가 응답됩니다.
 *
 * @param {WithRedirection<BrandpayPaymentRequest>} paymentRequest 결제 요청 정보입니다.
 *
 * @example
 * ```javascript
 * brandpay.requestPayment({
 *   amount: {
 *     currency: 'KRW',
 *     value: 50000,
 *   },
 *   orderId: "<UniqueId name='orderId.brandpay' />",
 *   orderName: '토스 티셔츠 외 2건',
 *   successUrl: window.location.origin + '/success.html',
 *   failUrl: window.location.origin + '/fail.html',
 *   customerEmail: 'customer123@gmail.com',
 *   customerName: '김토스',
 * });
 * ```
 */
type RequestPaymentWithRedirection = (paymentRequest: WithRedirection<BrandpayPaymentRequest>) => Promise<void>;
/**
 * @docsAlias Promise 방식
 * @returns `BrandpayRequestPaymentResult` 객체가 응답됩니다. 객체 필드를 확인하고 [브랜드페이 결제 승인 API](/reference/brandpay#결제-승인)를 호출해야 결제가 최종적으로 완료돼요.
 * @param {BrandpayPaymentRequest} paymentRequest 결제 요청 정보입니다.
 *
 * @example
 * ```javascript
 * brandpay.requestPayment({
 *   amount: {
 *     currency: 'KRW',
 *     value: 50000,
 *   },
 *   orderId: "<UniqueId name='orderId.brandpay' />",
 *   orderName: '토스 티셔츠 외 2건',
 *   customerEmail: 'customer123@gmail.com',
 *   customerName: '김토스',
 * });
 * ```
 */
type RequestPaymentWithPromise = (paymentRequest: BrandpayPaymentRequest) => Promise<BrandpayRequestPaymentResult>;

/**
 * 등록된 비밀번호를 변경합니다
 *
 *
 * @example
 * ```javascript
 * brandpay.changePassword();
 * ```
 *
 * @throws {@link PublicError.Brandpay.UserCancelError} 사용자가 비밀번호 변경을 취소한 경우
 * @throws {@link PublicError.Brandpay.NotRegisteredRedirectUrlError} redirectUrl이 등록되지 않은 경우
 * @throws {@link PublicError.Brandpay.InvalidMethodTransactionError} 이미 다른 명령을 수행 중인 경우
 * @throws {@link PublicError.Brandpay.InvalidParametersError} 파라미터가 올바르지 않은 경우
 * @throws {@link PublicError.Brandpay.UnknownError} 알 수 없는 오류가 발생한 경우
 *
 * @returns
 *
 */
type ChangePassword = () => Promise<void>;

/**
 * 새로운 결제수단을 등록합니다
 *
 *
 * @example
 * ```javascript
 * brandpay.addPaymentMethod();
 * ```
 *
 * @throws {@link PublicError.Brandpay.UserCancelError} 사용자가 결제수단 등록을 취소한 경우
 * @throws {@link PublicError.Brandpay.NotRegisteredRedirectUrlError} redirectUrl이 등록되지 않은 경우
 * @throws {@link PublicError.Brandpay.InvalidMethodTransactionError} 이미 다른 명령을 수행 중인 경우
 * @throws {@link PublicError.Brandpay.InvalidParametersError} 파라미터가 올바르지 않은 경우
 * @throws {@link PublicError.Brandpay.UnknownError} 알 수 없는 오류가 발생한 경우
 *
 * @returns
 */
type AddPaymentMethod = () => Promise<void>;

/**
 * 설정 화면을 엽니다
 *
 *
 * @example
 * ```javascript
 * brandpay.openSettings();
 * ```
 *
 *
 * @throws {@link PublicError.Brandpay.UserCancelError} 사용자가 설정 화면을 닫은 경우
 * @throws {@link PublicError.Brandpay.NotRegisteredRedirectUrlError} redirectUrl이 등록되지 않은 경우
 * @throws {@link PublicError.Brandpay.InvalidMethodTransactionError} 이미 다른 명령을 수행 중인 경우
 * @throws {@link PublicError.Brandpay.InvalidParametersError} 파라미터가 올바르지 않은 경우
 * @throws {@link PublicError.Brandpay.UnknownError} 알 수 없는 오류가 발생한 경우
 */
type OpenSettings = () => Promise<void>;

/**
 * 원터치 결제 설정을 변경합니다
 *
 *
 * @example
 * ```javascript
 * brandpay.changeOneTouchPay();
 * ```
 *
 * @throws {@link PublicError.Brandpay.UserCancelError} 사용자가 원터치 결제 설정 화면을 닫은 경우
 * @throws {@link PublicError.Brandpay.NeedMerchantOneTouchSettingError} 가맹점에서 원터치 결제 설정을 하지 않은 경우
 * @throws {@link PublicError.Brandpay.NotRegisteredRedirectUrlError} redirectUrl이 등록되지 않은 경우
 * @throws {@link PublicError.Brandpay.InvalidMethodTransactionError} 이미 다른 명령을 수행 중인 경우
 * @throws {@link PublicError.Brandpay.InvalidParametersError} 파라미터가 올바르지 않은 경우
 * @throws {@link PublicError.Brandpay.UnknownError} 알 수 없는 오류가 발생한 경우
 *
 * @returns
 */
type ChangeOneTouchPay = () => Promise<void>;

/**
 * 원터치결제가 활성화되어있는지 확인합니다
 *
 *
 * @example
 * ```javascript
 * const result = await brandpay.isOneTouchPayEnabled();
 * alert(result);
 * ```
 *
 * @throws {@link PublicError.Brandpay.NeedAgreementWithTermsError} 약관 동의가 필요한 경우
 * @throws {@link PublicError.Brandpay.NeedMerchantOneTouchSettingError} 가맹점에서 원터치 결제 설정을 하지 않은 경우
 * @throws {@link PublicError.Brandpay.NotRegisteredRedirectUrlError} redirectUrl이 등록되지 않은 경우
 * @throws {@link PublicError.Brandpay.InvalidMethodTransactionError} 이미 다른 명령을 수행 중인 경우
 * @throws {@link PublicError.Brandpay.InvalidParametersError} 파라미터가 올바르지 않은 경우
 * @throws {@link PublicError.Brandpay.UnknownError} 알 수 없는 오류가 발생한 경우
 */
type IsOneTouchPayEnabled = () => Promise<{
    /**
     * 원터치결제 활성화 여부입니다. 원터치결제가 설정되어 있다면 `true`, 설정되어 있지 않으면 `false`입니다.
     */
    isEnabled: boolean;
}>;

/**
 * 자동결제(빌링) 약관 동의와 비밀번호 인증을 수행합니다
 *
 * @example
 * ```javascript
 * brandpay.requestBillingAuth();
 * ```
 *
 * @throws {@link PublicError.Brandpay.UserCancelError} 사용자가 자동결제 인증창을 닫은 경우
 * @throws {@link PublicError.Brandpay.NotRegisteredRedirectUrlError} redirectUrl이 등록되지 않은 경우
 * @throws {@link PublicError.Brandpay.InvalidMethodTransactionError} 이미 다른 명령을 수행 중인 경우
 * @throws {@link PublicError.Brandpay.UnknownError} 알 수 없는 오류가 발생한 경우
 */
type RequestBillingAuth$1 = () => Promise<void>;

/**
 * amount가 0보다 작거나 같을 때 발생합니다.
 */
declare class BelowZeroAmountError$1 extends PublicInterfaceError {
    constructor();
}

/**
 * failUrl이 올바른 형식이 아닐 때 발생합니다.
 */
declare class IncorrectFailUrlFormatError$1 extends PublicInterfaceError {
    constructor();
}

/**
 * successUrl이 올바른 형식이 아닐 때 발생합니다.
 */
declare class IncorrectSuccessUrlFormatError$1 extends PublicInterfaceError {
    constructor();
}

/**
 * amount가 숫자가 아닌 경우 발생합니다.
 */
declare class InvalidAmountValueError$1 extends PublicInterfaceError {
    constructor();
}

/**
 * clientKey가 올바르지 않을 때 발생합니다.
 */
declare class InvalidClientKeyError$1 extends PublicInterfaceError {
    constructor();
}

/**
 * customerKey가 올바르지 않을 때 발생합니다.
 */
declare class InvalidCustomerKeyError$1 extends PublicInterfaceError {
    constructor();
}

/**
 * metadata가 올바르지 않을 경우 발생합니다.
 */
declare class InvalidMetadataError$1 extends PublicInterfaceError {
    constructor();
}

/**
 * 이미 다른 명령을 수행하고 있을 때 발생합니다.
 */
declare class InvalidMethodTransactionError$1 extends PublicInterfaceError {
    constructor();
}

/**
 * 입력된 파라미터가 올바르지 않을 경우 발생합니다.
 */
declare class InvalidParametersError$1 extends PublicInterfaceError {
    constructor(message: string);
}

/**
 * 사용자의 데이터를 SDK로 가져오지 못했을 때 발생합니다.
 * 사용자가 약관 동의 과정을 마치고 브랜드페이 서비스에 가입되어 있어야 합니다.
 */
declare class NeedAgreementWithTermsError extends PublicInterfaceError {
    constructor();
}

/**
 * 원터치결제 사용이 설정되어 있지 않은 상점에서 원터치결제 사용과 관련된 메서드인
 * setupOneTouchPay, toggleOneTouchPay, isOneTouchPayEnabled 를
 * 호출했을 때 발생하는 에러입니다.
 */
declare class NeedMerchantOneTouchSettingError extends PublicInterfaceError {
    constructor();
}

/**
 * redirect url이 등록되지 않았을 때 발생합니다.
 */
declare class NotRegisteredRedirectUrlError extends PublicInterfaceError {
    constructor();
}

/**
 * 결제에 실패했을 때 발생하는 에러입니다.
 */
declare class PaymentRequestFailError$1 extends PublicInterfaceError {
    readonly orderId: string;
    constructor(message: string, { orderId, code }: {
        code: string;
        orderId: string;
    });
}

/**
 * 실행 중, 정의되지 않은 에러가 발생했을 때 발생하는 에러입니다.
 * 모든 메서드에서 발생할 수 있습니다.
 */
declare class UnknownError$1 extends PublicInterfaceError {
    constructor();
}

/**
 * 사용자가 제품 창을 닫았을 때 발생하는 에러입니다.
 */
declare class UserCancelError$1 extends PublicInterfaceError {
    constructor();
}

/**
 * v1 메서드는 v2 에서 지원하지 않습니다.
 * 잘못 연동하고 있다는 피드백을 빨리 줄 수 있도록 에러를 명확하게 던집니다.
 */
declare class V1MethodNotSupportedError$1 extends PublicInterfaceError {
    constructor();
}

/**
 * customer key에 secret key를 사용한 경우 발생합니다.
 */
declare class InsecureKeyUsageError$1 extends PublicInterfaceError {
    constructor();
}

declare class NotSupportedWidgetKeyError$1 extends PublicInterfaceError {
    constructor();
}

/**
 * 서버와 통신하는 중 네트워크 오류가 발생했을 때 발생하는 에러입니다.
 */
declare class NetworkError$1 extends PublicInterfaceError {
    constructor();
}

type index$4_NeedAgreementWithTermsError = NeedAgreementWithTermsError;
declare const index$4_NeedAgreementWithTermsError: typeof NeedAgreementWithTermsError;
type index$4_NeedMerchantOneTouchSettingError = NeedMerchantOneTouchSettingError;
declare const index$4_NeedMerchantOneTouchSettingError: typeof NeedMerchantOneTouchSettingError;
type index$4_NotRegisteredRedirectUrlError = NotRegisteredRedirectUrlError;
declare const index$4_NotRegisteredRedirectUrlError: typeof NotRegisteredRedirectUrlError;
declare namespace index$4 {
  export {
    BelowZeroAmountError$1 as BelowZeroAmountError,
    IncorrectFailUrlFormatError$1 as IncorrectFailUrlFormatError,
    IncorrectSuccessUrlFormatError$1 as IncorrectSuccessUrlFormatError,
    InsecureKeyUsageError$1 as InsecureKeyUsageError,
    InvalidAmountValueError$1 as InvalidAmountValueError,
    InvalidClientKeyError$1 as InvalidClientKeyError,
    InvalidCustomerKeyError$1 as InvalidCustomerKeyError,
    InvalidMetadataError$1 as InvalidMetadataError,
    InvalidMethodTransactionError$1 as InvalidMethodTransactionError,
    InvalidParametersError$1 as InvalidParametersError,
    index$4_NeedAgreementWithTermsError as NeedAgreementWithTermsError,
    index$4_NeedMerchantOneTouchSettingError as NeedMerchantOneTouchSettingError,
    NetworkError$1 as NetworkError,
    index$4_NotRegisteredRedirectUrlError as NotRegisteredRedirectUrlError,
    NotSupportedWidgetKeyError$1 as NotSupportedWidgetKeyError,
    PaymentRequestFailError$1 as PaymentRequestFailError,
    UnknownError$1 as UnknownError,
    UserCancelError$1 as UserCancelError,
    V1MethodNotSupportedError$1 as V1MethodNotSupportedError,
  };
}

interface TossPaymentsBrandpay {
    /**
     * 브랜드페이 결제창을 띄웁니다. [자세히 >](#brandpayrequestpayment)
     */
    requestPayment: RequestPayment$1;
    /**
     * 브랜드페이 결제 비밀번호를 변경하는 창을 띄웁니다. [자세히 >](#brandpaychangepassword)
     */
    changePassword: ChangePassword;
    /**
     * 브랜드페이에 새로운 결제수단을 추가합니다. [자세히 >](#brandpayaddpaymentmethod)
     */
    addPaymentMethod: AddPaymentMethod;
    /**
     * 브랜드페이 결제 관리 설정창을 띄웁니다. [자세히 >](#brandpayopensettings)
     */
    openSettings: OpenSettings;
    /**
     * 원터치결제 설정을 변경합니다. [자세히 >](#brandpaychangeonetouchpay)
     */
    changeOneTouchPay: ChangeOneTouchPay;
    /**
     * 원터치결제 활성화 여부를 확인합니다. [자세히 >](#brandpayisonetouchpayenabled)
     */
    isOneTouchPayEnabled: IsOneTouchPayEnabled;
    /**
     * 자동결제(빌링) 약관 동의와 비밀번호 인증을 수행합니다 [자세히 >](#brandpayrequestbillingauth)
     */
    /**
     * @ignore
     */
    requestBillingAuth: RequestBillingAuth$1;
}

type index$3_TossPaymentsBrandpay = TossPaymentsBrandpay;
declare namespace index$3 {
  export {
    index$4 as Errors,
    index$5 as Models,
    index$3_TossPaymentsBrandpay as TossPaymentsBrandpay,
  };
}

/**
 * 열려있는 결제창을 닫습니다.
 *
 * 진행 중인 `requestPayment()` Promise 가 `PaymentRequestAbortedError` 로 reject 됩니다.
 *
 * @throws {@link PublicError.Payment.NoActivePaymentRequestError} 진행 중인 결제 요청이 없는 경우
 * @throws {@link PublicError.Payment.UnknownError} 알 수 없는 오류가 발생한 경우
 *
 * @example
 * ```javascript
 * await payment.destroy();
 * ```
 */
type Destroy = () => Promise<void>;

interface PaymentRequest {
    /**
     * 결제 금액 정보입니다.
     */
    amount: Amount;
    /**
     * 구매상품입니다. 예를 들면 `생수 외 1건` 같은 형식입니다. 최대 길이는 100자입니다.
     */
    orderName: string;
    /**
     * 주문번호입니다. 각 주문을 구분하는 무작위한 고유값을 생성하세요. 영문 대소문자, 숫자, 특수문자 `-`, `_`, `=`로 이루어진 6자 이상 64자 이하의 문자열이어야 합니다.
     */
    orderId: string;
    /**
     * 구매자명입니다. 최대 길이는 100자입니다.
     */
    customerName?: string | null;
    /**
     * 구매자 이메일입니다. 결제 상태가 바뀌면 이메일 주소로 결제내역이 전송됩니다. 최대 길이는 100자입니다.
     */
    customerEmail?: string | null;
    /**
     * 구매자의 휴대폰 번호입니다. 가상계좌 안내, 퀵계좌이체 휴대폰 번호 자동 완성에 사용되고 있어요. `-` 없이 숫자로만 구성된 최소 8자, 최대 15자의 문자열입니다.
     */
    customerMobilePhone?: string | null;
    /**
     * 결제 금액 중 면세 금액입니다. 면세 상점 혹은 복합 과세 상점으로 계약된 상점만 사용하세요. 자세한 내용은 세금 처리 가이드에서 확인하세요.
     */
    taxFreeAmount?: number | null;
    /**
     * 브라우저에서 결제창이 열리는 프레임입니다. `self`, `iframe` 중 하나입니다.
     *
     * \- `self`는 현재 브라우저를 결제창으로 이동시켜요. 모바일 환경에서 기본 값입니다.
     *
     * \- `iframe`은 iframe에서 결제창이 열려요. PC 환경에서 기본 값입니다. **모바일 환경에서는 `iframe`을 사용할 수 없습니다.**
     */
    windowTarget?: 'iframe' | 'self' | null;
    /**
     * @ignore
     */
    pendingUrl?: string | null;
    /**
     * 결제 관련 정보를 추가할 수 있는 객체입니다. 최대 5개의 키-값(key-value) 쌍을 자유롭게 추가해주세요. 키는 `[` , `]` 를 사용하지 않는 최대 40자의 문자열, 값은 최대 2000자의 문자열입니다.
     */
    metadata?: Record<string | symbol | number, unknown> | null;
    /**
     * @ignore
     */
    orderProductCode?: string | null;
    /**
     * @ignore
     */
    sandbox?: {
        /**
         * @ignore
         */
        paymentResult: 'SUCCESS' | 'FAIL';
    };
    /**
     * @ignore
     */
    subOrders?: Array<{
        merchantBusinessNumber: string;
        merchantName: string;
        merchantAddress: {
            country: string;
            postalCode: string;
            address: string;
            detailAddress?: string | null;
        };
        orderName: string;
    }> | null;
}

interface CardPaymentRequest extends PaymentRequest {
    /**
     * 결제수단입니다. `CARD`로 설정하면 카드/간편결제 통합결제창, 카드・간편결제 자체창을 사용할 수 있어요.
     */
    method: 'CARD';
    /**
     * 카드 결제 정보입니다.
     */
    card?: {
        /**
         * 에스크로 적용 여부입니다. `true`로 설정하면 구매자가 반드시 에스크로 적용에 동의해야 결제가 완료돼요. `false`로 설정하거나 파라미터를 설정하지 않으면 에스크로 적용을 구매자 선택에 맡겨요.
         */
        useEscrow?: boolean | null;
        /**
         * 과세를 제외한 결제 금액(컵 보증금 등)입니다.
         *
         * 과세 제외 금액이 있는 카드 결제는 부분 취소가 안 됩니다.
         */
        taxExemptionAmount?: number | null;
        /**
         * 결제창을 여는 방법입니다. `DEFAULT`는 카드/간편결제 통합결제창을 열고, `DIRECT`는 카드 또는 간편결제의 자체창을 열어요.
         *
         * 기본 값은 `DEFAULT`입니다.
         */
        flowMode?: 'DIRECT' | 'DEFAULT' | null;
        /**
         * [카드사 코드](/codes/org-codes#카드사-코드)입니다. `flowMode` 값에 따라 아래와 같이 다르게 동작해요.
         *
         * `flowMode`가 `DIRECT`일 때는 입력한 코드의 카드사 앱이 열려요.
         * `flowMode`가 `DEFAULT`일 때는 통합결제창에 입력한 코드의 카드사만 표시돼요. 파이프(`|`)로 구분해서 여러 카드사를 지정할 수 있어요. 예를 들어, `BC|삼성`을 입력하면 BC카드와 삼성카드가 결제창에 표시돼요.
         */
        cardCompany?: string | null;
        /**
         * [간편결제 코드](/codes/org-codes#간편결제사-코드)입니다. `flowMode` 값에 따라 아래와 같이 다르게 동작해요.
         *
         * `flowMode`가 `DIRECT`일 때는 입력한 코드의 간편결제 앱이 열려요.
         * `flowMode`가 `DEFAULT`일 때는 해당 파라미터와 상관 없이 기본 통합결제창이 열려요.
         */
        easyPay?: string | null;
        /**
         * 신용카드 결제에 적용되는 할부 개월 수입니다.
         *
         * 예를 들어, `6`으로 설정하면 할부 개월 수가 6개월로 고정돼요. 자체창에서는 구매자가 할부 개월 수를 볼 수 없으니 사전에 충분히 안내를 해주세요.
         * 0(일시불), 2~12 값으로 설정할 수 있고 `maxCardInstallmentPlan` 파라미터와 함께 사용할 수 없어요. 카드사 별로 할부결제가 가능한 [최소 금액](https://consumer.tosspayments.com/notice/free-installment)을 확인하세요.
         */
        cardInstallmentPlan?: number | null;
        /**
         * 신용카드 결제에 적용할 수 있는 최대 할부 개월 수입니다.
         *
         * 예를 들어, `6`으로 설정하면 구매자는 일시불부터 6개월 할부를 선택할 수 있어요. 0(일시불), 2~12 값으로 설정할 수 있고 `cardInstallmentPlan` 파라미터와 함께 사용할 수 없어요. 카드사 별로 할부결제가 가능한 [최소 금액](https://consumer.tosspayments.com/notice/free-installment)을 확인하세요.
         */
        maxCardInstallmentPlan?: number | null;
        /**
         * 신용카드 결제에 적용할 수 있는 **상점 부담 무이자** 할부 정보입니다.
         *
         * 구매자가 선택한 카드, 할부 개월 수가 배열에 등록한 정보와 같다면 무이자 할부가 자동으로 적용돼요. 카드사 별로 할부결제가 가능한 [최소 금액](https://consumer.tosspayments.com/notice/free-installment)을 확인하세요.
         */
        freeInstallmentPlans?: Array<{
            /**
             * 상점 부담 무이자를 적용할 [카드사 코드](/codes/org-codes#카드사-코드)입니다.
             */
            company: string;
            /**
             * 상점 부담 무이자를 적용할 할부 개월입니다.
             */
            months: number[];
        }> | null;
        /**
         * 카드사 포인트 사용 여부입니다. `true`로 설정하면 카드사 포인트 사용이 체크된 상태로 결제창이 열려요. `false`로 설정하거나 값을 넣지 않으면 구매자가 직접 카드사 포인트 사용 여부를 선택할 수 있어요.
         *
         * \* 추가 계약이 필요한 파라미터입니다. 토스페이먼츠 고객센터(1544-7772, support@tosspayments.com)로 문의해주세요.
         */
        useCardPoint?: boolean | null;
        /**
         * 앱카드 단독 사용 여부입니다. `true`로 설정하면 카드사의 앱카드만 열려요. 국민, 농협, 롯데, 삼성, 신한, 우리, 현대 카드 결제에 적용할 수 있어요.
         */
        useAppCardOnly?: boolean | null;
        /**
         * 카드사의 프로모션 코드입니다. 프로모션은 `flowMode`가 `DIRECT`로 설정된 자체창 결제에만 사용할 수 있어요. 프로모션 조회 API로 적용할 수 있는 프로모션 코드를 확인하세요.
         */
        discountCode?: string | null;
        /**
         * 시간으로 설정하는 결제 기한입니다. 설정할 수 있는 최대 값은 2160시간(90일)입니다.
         *
         * 기한이 지나고 시도하는 결제는 실패해요. 예를 들어 `24`로 설정하면, 결제 요청 시점으로부터 24시간 동안 결제할 수 있어요.
         */
        validHours?: number | null;
        /**
         * 특정 날짜로 설정하는 결제 기한입니다. `yyyy-MM-dd'T'HH:mm:ss` ISO 8601 형식입니다.
         *
         * 기한이 지나고 시도하는 결제는 실패해요. 예를 들어 `2025-01-01T00:00:00`으로 설정하면, 2024년 12월 31일 23:59까지 결제할 수 있어요.
         */
        dueDate?: string | null;
        escrowProducts?: Array<{
            /**
             * 각 상품의 고유 ID입니다.
             */
            id?: string | null;
            /**
             * 상품명입니다.
             */
            name?: string | null;
            /**
             * 내 상점에서 사용하는 상품 관리 코드입니다.
             */
            code?: string | null;
            /**
             * 상품의 1개의 개별 가격입니다.
             */
            unitPrice?: number | null;
            /**
             * 상품 구매 수량입니다.
             */
            quantity?: number | null;
        }> | null;
        /**
         * 해외카드(Visa, MasterCard, JCB, UnionPay 등) 결제 여부입니다. `true`로 설정하면 해외카드 결제가 가능한 [다국어 결제창](/resources/glossary/payment-window#어떤-기능이-있나요)이 열립니다.
         */
        useInternationalCardOnly?: boolean | null;
        /**
         * 결제창 초기 언어입니다. `KO`(한국어), `EN`(영어), `JA`(일본어), `ZH`(중국어) 중 하나로 설정할 수 있어요. 값을 설정하지 않으면 결제 통화에 따라 자동으로 결정됩니다.
         */
        language?: 'KO' | 'EN' | 'JA' | 'ZH' | null;
        /**
         * 다국어 결제창에서 예상 결제 금액(USD 환산값) 노출 여부입니다. 기본값은 `true`이고, `false`로 설정하면 예상 결제 금액이 숨겨집니다. `useInternationalCardOnly`가 `true`이고 결제 통화가 `KRW`일 때만 적용됩니다.
         */
        showEstimatedAmount?: boolean | null;
        /**
         * @ignore
         */
        threeDS?: {
            /**
             * @ignore
             */
            challengeMode?: 'CHALLENGE_REQUIRED' | null;
        } | null;
        /**
         * 페이북/ISP 앱에서 상점 앱으로 돌아올 때 사용됩니다. 상점의 앱 스킴을 지정하면 됩니다. 예를 들면 testapp://같은 형태입니다.
         */
        appScheme?: string | null;
        /**
         * 키인 결제정보입니다.
         */
        keyin?: {
            /**
             * 결제화면에 노출할 카드 타입입니다. `PERSONAL`(개인카드), `CORPORATE`(법인카드), `FOREIGN`(해외카드) 값을 배열 형태로 전달할 수 있습니다. 입력한 순서대로 화면에 노출되며, 첫 번째로 입력한 카드 타입이 기본 선택됩니다.
             */
            selectableCardTypes?: Array<'PERSONAL' | 'CORPORATE' | 'FOREIGN'> | null;
        } | null;
        /**
         * 모바일 결제창 상단 헤더의 노출 여부입니다. `false`로 설정하면 헤더가 표시되지 않아요. 값을 설정하지 않으면 `true`로 동작합니다.
         */
        showMobileAppHeader?: boolean | null;
        /**
         * @ignore
         */
        affiliateCards?: Array<{
            issuerCode: string;
            cardProductCode: string;
        }> | null;
        /**
         * @ignore
         */
        dividedSettlements?: Array<{
            subMid: string;
            amount: number;
            taxFreeAmount: number;
            productInfo: string;
        }> | null;
    } | null;
}

interface VirtualAccountPaymentRequest extends PaymentRequest {
    /**
     * 결제수단입니다. 가상계좌 결제창을 열려면 `VIRTUAL_ACCOUNT`로 설정하세요.
     */
    method: 'VIRTUAL_ACCOUNT';
    /**
     * 가상계좌 결제 정보입니다.
     */
    virtualAccount?: {
        /**
         * 과세를 제외한 결제 금액(컵 보증금 등)입니다.
         */
        taxExemptionAmount?: number | null;
        /**
         * 현금영수증 정보입니다.
         */
        cashReceipt?: {
            /**
             * 현금영수증 발급 용도입니다. '소득공제', '지출증빙', '미발행' 중 하나입니다.
             */
            type: '소득공제' | '지출증빙' | '미발행';
        } | null;
        /**
         * 에스크로 적용 여부입니다.
         */
        useEscrow?: boolean | null;
        /**
         * 에스크로 상품 정보입니다.
         * 여러 가지의 상품을 결제했다면 각 상품의 정보를 입력하세요. 예를 들어, 구매자가 세 가지 종류의 상품을 구매했다면 배열의 길이는 3이어야 합니다.
         */
        escrowProducts?: Array<{
            /**
             * 각 상품의 고유 ID입니다.
             */
            id?: string | null;
            /**
             * 상품명입니다.
             */
            name?: string | null;
            /**
             * 내 상점에서 사용하는 상품 관리 코드입니다.
             */
            code?: string | null;
            /**
             * 상품의 1개의 개별 가격입니다.
             */
            unitPrice?: number | null;
            /**
             * 상품 구매 수량입니다.
             */
            quantity?: number | null;
        }> | null;
        /**
         * 시간으로 설정하는 결제 기한입니다. 설정할 수 있는 최대 값은 2160시간(90일)입니다.
         * 기한이 지나고 시도하는 결제는 실패해요. 예를 들어 `24`로 설정하면, 결제 요청 시점으로부터 24시간 동안 결제할 수 있어요.
         */
        validHours?: number | null;
        /**
         * 특정 날짜로 설정하는 결제 기한입니다. `yyyy-MM-dd'T'HH:mm:ss` ISO 8601 형식입니다.
         * 기한이 지나고 시도하는 결제는 실패해요. 예를 들어 `2025-01-01T00:00:00`으로 설정하면, 2024년 12월 31일 23:59까지 결제할 수 있어요.
         */
        dueDate?: string | null;
        /**
         * 문화비(도서, 공연 티켓, 박물관·미술관 입장권 등) 지출 여부입니다.
         */
        isCulturalExpenses?: boolean | null;
        /**
         * 결제창에 구매자 휴대폰 번호 입력란을 노출할지 여부입니다.
         */
        showCustomerMobilePhone?: boolean | null;
        /**
         * @ignore
         */
        refundReceiveAccount?: {
            /**
             * @ignore
             */
            bankCode: string;
            /**
             * @ignore
             */
            accountNumber: string;
            /**
             * @ignore
             */
            holderName: string;
        } | null;
    } | null;
}

interface TransferPaymentRequest extends PaymentRequest {
    /**
     * 결제수단입니다. `TRANSFER`로 설정하면 퀵계좌이체 결제창이 열려요.
     */
    method: 'TRANSFER';
    /**
     * 계좌이체 정보입니다.
     */
    transfer?: {
        /**
         * 과세를 제외한 결제 금액(컵 보증금 등)입니다.
         */
        taxExemptionAmount?: number | null;
        /**
         * 현금영수증 정보입니다.
         */
        cashReceipt?: {
            /**
             *  type을 '미발행' 으로 보내면 현금영수증을 발행하지 않습니다.
             */
            type: '소득공제' | '지출증빙' | '미발행';
        } | null;
        /**
         * 에스크로 적용 여부입니다. `true`로 설정하면 구매자가 반드시 에스크로 적용에 동의해야 결제가 완료돼요.
         * `false`로 설정하거나 파라미터를 설정하지 않으면 에스크로 적용을 구매자 선택에 맡겨요.
         */
        useEscrow?: boolean | null;
        /**
         * 에스크로 상품 정보입니다.
         * 여러 가지의 상품을 결제했다면 각 상품의 정보를 입력하세요. 예를 들어, 구매자가 세 가지 종류의 상품을 구매했다면 배열의 길이는 3이어야 합니다.
         */
        escrowProducts?: Array<{
            /**
             * 각 상품의 고유 ID입니다.
             */
            id?: string | null;
            /**
             * 상품명입니다.
             */
            name?: string | null;
            /**
             * 내 상점에서 사용하는 상품 관리 코드입니다.
             */
            code?: string | null;
            /**
             * 상품의 1개의 개별 가격입니다.
             */
            unitPrice?: number | null;
            /**
             * 상품 구매 수량입니다.
             */
            quantity?: number | null;
        }> | null;
        /**
         * 시간으로 설정하는 결제 기한입니다. 설정할 수 있는 최대 값은 2160시간(90일)입니다.
         * 기한이 지나고 시도하는 결제는 실패해요. 예를 들어 `24`로 설정하면, 결제 요청 시점으로부터 24시간 동안 결제할 수 있어요.
         */
        validHours?: number | null;
        /**
         * 특정 날짜로 설정하는 결제 기한입니다. `yyyy-MM-dd'T'HH:mm:ss` ISO 8601 형식입니다.
         * 기한이 지나고 시도하는 결제는 실패해요. 예를 들어 `2025-01-01T00:00:00`으로 설정하면, 2024년 12월 31일 23:59까지 결제할 수 있어요.
         */
        dueDate?: string | null;
        /**
         * 문화비(도서, 공연 티켓, 박물관·미술관 입장권 등) 지출 여부입니다.
         */
        isCulturalExpenses?: boolean | null;
        /**
         * @ignore
         */
        encryptedCustomerCi?: string | null;
        /**
         * @ignore
         */
        encryptedCustomerKey?: string | null;
        /**
         * @ignore
         */
        showSecuritiesAccount?: boolean | null;
        /**
         * @ignore
         */
        provider?: 'OPENBANKING' | 'BANKPAY' | null;
        /**
         * @ignore
         */
        dividedSettlements?: Array<{
            subMid: string;
            amount: number;
            taxFreeAmount: number;
            productInfo: string;
        }> | null;
    } | null;
}

interface MobilePhonePaymentRequest extends PaymentRequest {
    /**
     * 결제수단입니다. `MOBILE_PHONE`으로 설정하면 휴대폰 결제창이 열려요.
     */
    method: 'MOBILE_PHONE';
    /**
     * 휴대폰 결제 정보입니다.
     */
    mobilePhone?: {
        /**
         * 휴대폰 결제창에서 선택할 수 있는 통신사를 제한합니다. `SKT`(SK텔레콤), `KT`(KT), `LGU`(LG유플러스), `HELLO`(LG헬로모바일), `KCT`(티플러스), `SK7`(SK세븐모바일) 값을 배열 형태로 전달할 수 있습니다. 예를 들어 `['KT', 'SKT']`로 설정하면 두 통신사만 선택할 수 있어요. 값을 설정하지 않으면 모든 통신사가 노출됩니다. 전체 목록은 [통신사 코드](/codes/org-codes#통신사-코드)에서 확인하세요.
         */
        mobileCarriers?: Array<'KT' | 'LGU' | 'SKT' | 'HELLO' | 'KCT' | 'SK7'> | null;
    } | null;
}

interface GiftCertificatePaymentRequest extends PaymentRequest {
    /**
     * 결제수단입니다. 토스페이먼츠는 세 종류의 상품권을 지원해요: 문화상품권(`CULTURE_GIFT_CERTIFICATE`), 도서문화상품권(`BOOK_GIFT_CERTIFICATE`), 게임문화상품권(`GAME_GIFT_CERTIFICATE`).
     */
    method: 'CULTURE_GIFT_CERTIFICATE' | 'BOOK_GIFT_CERTIFICATE' | 'GAME_GIFT_CERTIFICATE';
}

interface ForeignEasyPayPaymentRequest extends PaymentRequest {
    /**
     * 결제수단입니다. `FOREIGN_EASY_PAY`로 설정하면 PayPal 해외 간편결제를 사용할 수 있어요.
     */
    method: 'FOREIGN_EASY_PAY';
    /**
     * 해외 간편결제 정보입니다.
     */
    foreignEasyPay: {
        /**
         * 해외간편결제 코드입니다. 현재는 `PAYPAL`, `PAYPAY`만 지원하고 있어요.
         */
        provider: 'PAYPAL' | 'GCASH' | 'TOUCHNGO' | 'BOOST' | 'BPI' | 'BILLEASE' | 'DANA' | 'ALIPAYHK' | 'TRUEMONEY' | 'RABBIT_LINE_PAY' | 'ALIPAY' | 'PAYPAY';
        /**
         * 구매자가 위치한 국가입니다. ISO-3166의 두 자리 국가 코드를 입력하세요.
         */
        country: string;
        /**
         * 구매 상품 정보입니다. 여러 가지의 상품을 결제했다면 각 상품의 정보를 입력하세요. 예를 들어, 구매자가 세 가지 종류의 상품을 구매했다면 배열의 길이는 3이어야 합니다.
         *
         * PayPal에서 제공하는 판매자 보호를 받고 싶다면 반드시 해당 파라미터를 사용하세요. 판매자 보호 및 위험거래 관리를 위해 PayPal에 제공돼요.
         */
        products?: Array<{
            /**
             * 상품명입니다. 최대 길이는 100자입니다.
             */
            name: string;
            /**
             * 상품의 구매 수량입니다.
             */
            quantity: number;
            /**
             * 상품의 1개의 개별 가격입니다.
             */
            unitAmount: number;
            /**
             * 결제 통화입니다.
             */
            currency: string;
            /**
             * 상품 설명입니다.
             */
            description: string;
        }> | null;
        /**
         * 배송 정보입니다.
         */
        shipping?: {
            /**
             * 수령인입니다.
             */
            fullName?: string | null;
            /**
             * 배송 주소입니다.
             */
            address?: {
                /**
                 * 구매자가 위치한 국가입니다. ISO-3166의 두 자리 국가 코드를 입력하세요.
                 */
                country: string;
                /**
                 * 주소입니다. 도로명 및 건물(Street, Apt), 번지 정보입니다.
                 */
                line1?: string | null;
                /**
                 * 상세 주소입니다. 번지 및 동호수 정보를 입력하세요.
                 */
                line2?: string | null;
                /**
                 * 주(State, Province, Region) 정보입니다. 국가의 도시 체계에 따라 없는 경우가 있습니다.
                 */
                area1?: string | null;
                /**
                 * 도시입니다.
                 */
                area2: string;
                /**
                 * 배송지 우편번호입니다. 중국, 일본, 프랑스, 독일 등 [일부 국가](https://developer.paypal.com/api/rest/reference/orders/v2/country-address-requirements/#link-countryandregionaddressrequirements)에서는 필수 파라미터입니다
                 */
                postalCode?: string | null;
            } | null;
        } | null;
        /**
         * 특정 해외간편결제 수단에만 필요한 정보입니다.
         */
        paymentMethodOptions?: {
            /**
             * PayPal 결제에 추가로 필요한 정보입니다.
             */
            paypal?: {
                /**
                 * PayPal에서 추가로 요청하는 STC(Set Transaction Context) 정보입니다. 이 정보는 토스페이먼츠에서 관리하지 않으며, PayPal에서 부정거래, 결제 취소, 환불 등 리스크 관리에 활용합니다.
                 * 결제 거래의 안전성과 신뢰성을 확보하려면 이 정보를 전달해야 합니다. [PayPal STC 문서](https://static.tosspayments.com/public/STC.pdf)를 참고해서 업종에 따라 필요한 파라미터를 추가해주세요.
                 * 문서의 표에 있는 ‘Data Field Name’ 컬럼 값을 객체의 ‘key’로, ‘Description’에 맞는 값을 객체의 ‘value’로 넣어주시면 됩니다.
                 */
                setTransactionContext?: unknown;
            } | null;
        } | null;
    };
}

interface RequestPaymentResult {
    /**
     * 토스페이먼츠에서 발급하는 결제 식별 키입니다. 결제 승인, 조회, 취소 등에 사용되니 반드시 저장하세요.
     */
    paymentKey: string;
    /**
     * 주문번호입니다. 결제를 요청할 때 호출한 `requestPayment()` 메서드로 넘긴 `orderId` 값과 같은지 확인하세요.
     */
    orderId: string;
    /**
     * 결제 금액 정보입니다. `requestPayment()` 메서드로 넘긴 `amount` 값과 같은지 확인하세요.
     */
    amount: Amount;
}

/**
 * 자동결제(빌링) 등록 요청의 공통 필드입니다.
 */
interface BaseBillingAuthRequest {
    /**
     * 등록이 성공하면 리다이렉트되는 URL입니다. 리다이렉트되면 URL의 쿼리 파라미터로 `authKey`, `customerKey`가 추가돼요. 값을 검증하고 [빌링키 발급 API](/reference#authkey로-카드-빌링키-발급)를 호출하세요.
     * 반드시 오리진을 포함해야 합니다.
     *
     * @example https://www.example.com/success
     */
    successUrl: string;
    /**
     * 등록이 실패하면 리다이렉트되는 URL입니다. 리다이렉트되면 URL의 쿼리 파라미터로 에러 코드와 메시지를 확인할 수 있어요.
     * 반드시 오리진을 포함해야 합니다.
     */
    failUrl: string;
    /**
     * 구매자명입니다. 상점관리자 및 결제내역 이메일에 사용됩니다. 최대 길이는 100자입니다.
     */
    customerName?: string | null;
    /**
     * 구매자의 이메일 주소입니다. 결제 상태가 바뀌면 이메일 주소로 결제내역이 전송됩니다. 최대 길이는 100자입니다.
     */
    customerEmail?: string | null;
    /**
     * 브라우저에서 결제창이 열리는 프레임입니다. `self`, `iframe` 중 하나입니다.
     *
     * \- `self`는 현재 브라우저를 결제창으로 이동시켜요. 모바일 환경에서 기본 값입니다.
     *
     * \- `iframe`은 iframe에서 결제창이 열려요. PC 환경에서 기본 값입니다. **모바일 환경에서는 `iframe`을 사용할 수 없습니다.**
     *
     * @default 'iframe'
     */
    windowTarget?: 'iframe' | 'self' | null;
}
/**
 * 카드 자동결제(빌링) 등록 요청 정보입니다.
 */
interface CardBillingAuthRequest extends BaseBillingAuthRequest {
    /**
     * 자동결제(빌링)에 등록할 결제수단입니다.
     */
    method: 'CARD';
    /**
     * 결제화면에 노출할 카드 타입입니다. `PERSONAL`(개인카드), `CORPORATE`(법인카드) 값을 배열 형태로 전달할 수 있습니다. 입력한 순서대로 화면에 노출되며, 첫 번째로 입력한 카드 타입이 기본 선택됩니다.
     */
    selectableCardTypes?: Array<'PERSONAL' | 'CORPORATE'> | null;
    /**
     * 결제창을 여는 방법입니다. `DEFAULT`는 기존 카드 빌링창을 열고, `DIRECT`는 easyPay로 전달된 간편결제의 자체창을 엽니다.
     * 기본 값은 `DEFAULT`입니다.
     */
    flowMode?: 'DIRECT' | 'DEFAULT';
    /**
     * 간편결제사 코드입니다. 현재 빌링을 지원하는 간편결제사는 토스페이, 네이버페이가 있습니다.
     * `flowMode: 'DIRECT'`일 때만 사용할 수 있습니다.
     */
    easyPay?: '토스페이' | 'TOSSPAY' | '네이버페이' | 'NAVERPAY';
    /**
     * 간편결제에서 특정 카드사만 노출할 수 있도록 파라미터를 제공합니다.
     * `flowMode: 'DIRECT'`일 때만 사용할 수 있습니다.
     */
    cardCompany?: string;
}
/**
 * 계좌이체 자동결제(빌링) 등록 요청 정보입니다.
 */
interface TransferBillingAuthRequest extends BaseBillingAuthRequest {
    /**
     * 자동결제(빌링)에 등록할 결제수단입니다.
     */
    method: 'TRANSFER';
    /**
     * @ignore
     */
    transfer?: {
        /**
         * @ignore
         */
        encryptedCustomerCi?: string | null;
    } | null;
}
/**
 * 자동결제(빌링) 등록 요청 정보입니다. 토스페이먼츠 자동결제는 신용·체크카드, 계좌이체를 지원해요.
 * `method` 필드에 따라 사용 가능한 필드가 달라집니다.
 */
type BillingAuthRequest = CardBillingAuthRequest | TransferBillingAuthRequest;

type index$2_BillingAuthRequest = BillingAuthRequest;
type index$2_CardBillingAuthRequest = CardBillingAuthRequest;
type index$2_CardPaymentRequest = CardPaymentRequest;
type index$2_ForeignEasyPayPaymentRequest = ForeignEasyPayPaymentRequest;
type index$2_GiftCertificatePaymentRequest = GiftCertificatePaymentRequest;
type index$2_MobilePhonePaymentRequest = MobilePhonePaymentRequest;
type index$2_PaymentRequest = PaymentRequest;
type index$2_RequestPaymentResult = RequestPaymentResult;
type index$2_TransferBillingAuthRequest = TransferBillingAuthRequest;
type index$2_TransferPaymentRequest = TransferPaymentRequest;
type index$2_VirtualAccountPaymentRequest = VirtualAccountPaymentRequest;
declare namespace index$2 {
  export {
    index$2_BillingAuthRequest as BillingAuthRequest,
    index$2_CardBillingAuthRequest as CardBillingAuthRequest,
    index$2_CardPaymentRequest as CardPaymentRequest,
    index$2_ForeignEasyPayPaymentRequest as ForeignEasyPayPaymentRequest,
    index$2_GiftCertificatePaymentRequest as GiftCertificatePaymentRequest,
    index$2_MobilePhonePaymentRequest as MobilePhonePaymentRequest,
    index$2_PaymentRequest as PaymentRequest,
    index$2_RequestPaymentResult as RequestPaymentResult,
    index$2_TransferBillingAuthRequest as TransferBillingAuthRequest,
    index$2_TransferPaymentRequest as TransferPaymentRequest,
    index$2_VirtualAccountPaymentRequest as VirtualAccountPaymentRequest,
  };
}

/**
 *
 * @throws {@link PublicError.Payment.UserCancelError} 사용자가 결제창을 닫은 경우
 * @throws {@link PublicError.Payment.PaymentRequestAbortedError} `payment.destroy()` 호출로 결제 요청이 중단된 경우
 * @throws {@link PublicError.Payment.InvalidAmountValueError} 결제 금액이 유효하지 않은 경우
 * @throws {@link PublicError.Payment.InvalidAmountCurrencyError} 결제 금액의 통화가 유효하지 않은 경우
 * @throws {@link PublicError.Payment.BelowZeroAmountError} 결제 금액이 0원 미만인 경우
 * @throws {@link PublicError.Payment.NotSupportedPromiseError} promise 방식을 지원하지 않는 환경인 경우
 * @throws {@link PublicError.Payment.NotSupportedMethodError} 가맹점에서 정의되지 않은 method를 넘겨준 경우
 * @throws {@link PublicError.Payment.IncorrectSuccessUrlFormatError} 가맹점에서 유효하지 않은 successUrl을 넘겨준 경우
 * @throws {@link PublicError.Payment.IncorrectFailUrlFormatError} 가맹점에서 유효하지 않은 failUrl을 넘겨준 경우
 * @throws {@link PublicError.Payment.PaymentRequestFailError} 결제에 실패한 경우
 * @throws {@link PublicError.Payment.InvalidMethodTransactionError} 이미 다른 명령을 수행 중인 경우
 * @throws {@link PublicError.Payment.InvalidMetadataError} metadata가 올바르지 않은 경우
 * @throws {@link PublicError.Payment.InvalidParametersError} 파라미터가 올바르지 않은 경우
 * @throws {@link PublicError.Payment.UnknownError} 알 수 없는 오류가 발생한 경우
 */
type RequestPayment = RequestCardPaymentWithRedirection & RequestCardPaymentWithPromise & RequestVirtualAccountPaymentWithRedirection & RequestVirtualAccountPaymentWithPromise & RequestTransferPaymentWithRedirection & RequestTransferPaymentWithPromise & RequestMobilePhonePaymentWithRedirection & RequestMobilePhonePaymentWithPromise & RequestGiftCertificatePaymentWithRedirection & RequestGiftCertificatePaymentWithPromise & RequestForeignEasyPayPaymentWithRedirection;
/**
 * @docsAlias 카드(Promise 방식)
 * @returns `RequestPaymentResult` 객체가 응답됩니다. 객체 필드를 확인하고 [결제 승인 API](/reference#결제-승인)를 호출해야 결제가 최종적으로 완료돼요.
 * @param {RequestCardPaymentWithPromise} paymentRequest 결제 요청 정보입니다.
 *
 * @example
 *  ```javascript
 *  payment.requestPayment({
      method: "CARD",
      amount: {
        currency: "KRW",
        value: 50000,
      },
      orderId: "<UniqueId name='orderId.card' />",
      orderName: "토스 티셔츠 외 2건",
      customerEmail: "customer123@gmail.com",
      customerName: "김토스",
      windowTarget: "iframe",
      card: {
        useEscrow: false,
        flowMode: "DEFAULT",
        useCardPoint: false,
        useAppCardOnly: false,
      },
    });
 * ```
 */
type RequestCardPaymentWithPromise = (paymentRequest: CardPaymentRequest) => Promise<RequestPaymentResult>;
/**
 * @docsAlias 카드(Redirect 방식)
 * @returns 결제 요청이 성공하면 파라미터로 설정한 `successUrl`로 이동해요. 쿼리 파라미터의 `amount` 값이 메서드 파라미터로 설정한 `amount`와 같은지 반드시 확인하고 [결제 승인 API](/reference#결제-승인)를 호출해서 결제를 완료하세요.
 * ```plain theme="grey" copyable="false"
 * {successUrl}?amount={AMOUNT}&orderId={ORDER_ID}&paymentKey={PAYMENT_KEY}
 * ```
 * 결제 요청이 실패하면 파라미터로 설정한 `failUrl`로 이동해요. 쿼리 파라미터로 에러 코드와 메시지를 확인하세요.
 * ```plain theme="grey" copyable="false"
 * {failUrl}?code={ERROR_CODE}&message={ERROR_MESSAGE}&orderId={ORDER_ID}
 * ```
 * Redirect 방식에서는 URL이 이동하기 때문에 `void`가 응답됩니다.
 *
 * @param {RequestCardPaymentWithRedirection} paymentRequest 결제 요청 정보입니다.
 *
 * @example
 *  ```javascript
 *  payment.requestPayment({
      method: "CARD",
      amount: {
        currency: "KRW",
        value: 50000,
      },
      orderId: "<UniqueId name='orderId.card' />",
      orderName: "토스 티셔츠 외 2건",
      successUrl: window.location.origin + "/success.html",
      failUrl: window.location.origin + "/fail.html",
      customerEmail: "customer123@gmail.com",
      customerName: "김토스",
      card: {
        useEscrow: false,
        flowMode: "DEFAULT",
        useCardPoint: false,
        useAppCardOnly: false,
      },
    })
 * ```
 */
type RequestCardPaymentWithRedirection = (paymentRequest: WithRedirection<CardPaymentRequest>) => Promise<void>;
/**
 * @docsAlias 가상계좌(Promise 방식)
 * @returns `RequestPaymentResult` 객체가 응답됩니다. 객체 필드를 확인하고 [결제 승인 API](/reference#결제-승인)를 호출해야 결제가 최종적으로 완료돼요.
 * @param {VirtualAccountPaymentRequest} paymentRequest 결제 요청 정보입니다.
 *
 * @example
 *  ```javascript
 *  payment.requestPayment({
      method: "VIRTUAL_ACCOUNT",
      amount: {
        currency: "KRW",
        value: 50000,
      },
      orderId: "<UniqueId name='orderId.virtualaccount' />",
      orderName: "토스 티셔츠 외 2건",
      customerEmail: "customer123@gmail.com",
      customerName: "김토스",
      windowTarget: "iframe",
      virtualAccount: {
        cashReceipt: {
          type: "소득공제",
        },
        useEscrow: false,
        validHours: 24,
      },
    });
 * ```
 */
type RequestVirtualAccountPaymentWithPromise = (paymentRequest: VirtualAccountPaymentRequest) => Promise<RequestPaymentResult>;
/**
 * @docsAlias 가상계좌(Redirect 방식)
 * @returns 결제 요청이 성공하면 파라미터로 설정한 `successUrl`로 이동해요. 쿼리 파라미터의 `amount` 값이 메서드 파라미터로 설정한 `amount`와 같은지 반드시 확인하고 [결제 승인 API](/reference#결제-승인)를 호출해서 결제를 완료하세요.
 * ```plain theme="grey" copyable="false"
 * {successUrl}?amount={AMOUNT}&orderId={ORDER_ID}&paymentKey={PAYMENT_KEY}
 * ```
 * 결제 요청이 실패하면 파라미터로 설정한 `failUrl`로 이동해요. 쿼리 파라미터로 에러 코드와 메시지를 확인하세요.
 * ```plain theme="grey" copyable="false"
 * {failUrl}?code={ERROR_CODE}&message={ERROR_MESSAGE}&orderId={ORDER_ID}
 * ```
 * Redirect 방식에서는 URL이 이동하기 때문에 `void`가 응답됩니다.
 *
 * @param {RequestVirtualAccountPaymentWithRedirection} paymentRequest 결제 요청 정보입니다.
 *
 * @example
 *  ```javascript
 *  payment.requestPayment({
      method: "VIRTUAL_ACCOUNT",
      amount: {
        currency: "KRW",
        value: 50000,
      },
      orderId: "<UniqueId name='orderId.virtualaccount' />",
      orderName: "토스 티셔츠 외 2건",
      successUrl: window.location.origin + "/success.html",
      failUrl: window.location.origin + "/fail.html",
      customerEmail: "customer123@gmail.com",
      customerName: "김토스",
      virtualAccount: {
        cashReceipt: {
          type: "소득공제",
        },
        useEscrow: false,
        validHours: 24,
      },
    });
 * ```
 */
type RequestVirtualAccountPaymentWithRedirection = (paymentRequest: WithRedirection<VirtualAccountPaymentRequest>) => Promise<void>;
/**
 * @docsAlias 계좌이체(Promise 방식)
 * @returns `RequestPaymentResult` 객체가 응답됩니다. 객체 필드를 확인하고 [결제 승인 API](/reference#결제-승인)를 호출해야 결제가 최종적으로 완료돼요.
 * @param {RequestTransferPaymentWithPromise} paymentRequest 결제 요청 정보입니다.
 *
 * @example
 *  ```javascript
 *  payment.requestPayment({
      method: "TRANSFER",
      amount: {
        currency: "KRW",
        value: 50000,
      },
      orderId: "<UniqueId name='orderId.transfer' />",
      orderName: "토스 티셔츠 외 2건",
      customerEmail: "customer123@gmail.com",
      customerName: "김토스",
      transfer: {
        cashReceipt: {
          type: "소득공제",
        },
        useEscrow: false,
      },
    });
 * ```
 */
type RequestTransferPaymentWithPromise = (paymentRequest: TransferPaymentRequest) => Promise<RequestPaymentResult>;
/**
 * @docsAlias 계좌이체(Redirect 방식)
 * @returns 결제 요청이 성공하면 파라미터로 설정한 `successUrl`로 이동해요. 쿼리 파라미터의 `amount` 값이 메서드 파라미터로 설정한 `amount`와 같은지 반드시 확인하고 [결제 승인 API](/reference#결제-승인)를 호출해서 결제를 완료하세요.
 * ```plain theme="grey" copyable="false"
 * {successUrl}?amount={AMOUNT}&orderId={ORDER_ID}&paymentKey={PAYMENT_KEY}
 * ```
 * 결제 요청이 실패하면 파라미터로 설정한 `failUrl`로 이동해요. 쿼리 파라미터로 에러 코드와 메시지를 확인하세요.
 * ```plain theme="grey" copyable="false"
 * {failUrl}?code={ERROR_CODE}&message={ERROR_MESSAGE}&orderId={ORDER_ID}
 * ```
 * Redirect 방식에서는 URL이 이동하기 때문에 `void`가 응답됩니다.
 *
 * @param {RequestTransferPaymentWithRedirection} paymentRequest 결제 요청 정보입니다.
 *
 * @example
 *  ```javascript
 *  payment.requestPayment({
      method: "TRANSFER",
      amount: {
        currency: "KRW",
        value: 50000,
      },
      orderId: "<UniqueId name='orderId.transfer' />",
      orderName: "토스 티셔츠 외 2건",
      successUrl: window.location.origin + "/success.html",
      failUrl: window.location.origin + "/fail.html",
      customerEmail: "customer123@gmail.com",
      customerName: "김토스",
      transfer: {
        cashReceipt: {
          type: "소득공제",
        },
        useEscrow: false,
      },
    });
 * ```
 */
type RequestTransferPaymentWithRedirection = (paymentRequest: WithRedirection<TransferPaymentRequest>) => Promise<void>;
/**
 * @docsAlias 휴대폰 결제(Promise 방식)
 * @returns `RequestPaymentResult` 객체가 응답됩니다. 객체 필드를 확인하고 [결제 승인 API](/reference#결제-승인)를 호출해야 결제가 최종적으로 완료돼요.
 * @param {RequestMobilePhonePaymentWithPromise} paymentRequest 결제 요청 정보입니다.
 *
 * @example
 *  ```javascript
 *  payment.requestPayment({
      method: "MOBILE_PHONE",
      amount: {
        currency: "KRW",
        value: 50000,
      },
      orderId: "<UniqueId name='orderId.mobile' />",
      orderName: "토스 티셔츠 외 2건",
      customerEmail: "customer123@gmail.com",
      customerName: "김토스",
    });
 * ```
 */
type RequestMobilePhonePaymentWithPromise = (paymentRequest: MobilePhonePaymentRequest) => Promise<RequestPaymentResult>;
/**
 * @docsAlias 휴대폰 결제(Redirect 방식)
 * @returns 결제 요청이 성공하면 파라미터로 설정한 `successUrl`로 이동해요. 쿼리 파라미터의 `amount` 값이 메서드 파라미터로 설정한 `amount`와 같은지 반드시 확인하고 [결제 승인 API](/reference#결제-승인)를 호출해서 결제를 완료하세요.
 * ```plain theme="grey" copyable="false"
 * {successUrl}?amount={AMOUNT}&orderId={ORDER_ID}&paymentKey={PAYMENT_KEY}
 * ```
 * 결제 요청이 실패하면 파라미터로 설정한 `failUrl`로 이동해요. 쿼리 파라미터로 에러 코드와 메시지를 확인하세요.
 * ```plain theme="grey" copyable="false"
 * {failUrl}?code={ERROR_CODE}&message={ERROR_MESSAGE}&orderId={ORDER_ID}
 * ```
 * Redirect 방식에서는 URL이 이동하기 때문에 `void`가 응답됩니다.
 *
 * @param {RequestMobilePhonePaymentWithRedirection} paymentRequest 결제 요청 정보입니다.
 *
 * @example
 *  ```javascript
 *  payment.requestPayment({
      method: "MOBILE_PHONE",
      amount: {
        currency: "KRW",
        value: 50000,
      },
      orderId: "<UniqueId name='orderId.mobile' />",
      orderName: "토스 티셔츠 외 2건",
      successUrl: window.location.origin + "/success.html",
      failUrl: window.location.origin + "/fail.html",
      customerEmail: "customer123@gmail.com",
      customerName: "김토스",
    });
 * ```
 */
type RequestMobilePhonePaymentWithRedirection = (paymentRequest: WithRedirection<MobilePhonePaymentRequest>) => Promise<void>;
/**
 * @docsAlias 상품권(Promise 방식)
 * @returns `RequestPaymentResult` 객체가 응답됩니다. 객체 필드를 확인하고 [결제 승인 API](/reference#결제-승인)를 호출해야 결제가 최종적으로 완료돼요.
 * @param {RequestGiftCertificatePaymentWithPromise} paymentRequest 결제 요청 정보입니다.
 *
 * @example
 *  ```javascript
 *  payment.requestPayment({
      method: "CULTURE_GIFT_CERTIFICATE",
      amount: {
        currency: "KRW",
        value: 50000,
      },
      orderId: "<UniqueId name='orderId.giftcertificate' />",
      orderName: "토스 티셔츠 외 2건",
      customerEmail: "customer123@gmail.com",
      customerName: "김토스",
    });
 * ```
 */
type RequestGiftCertificatePaymentWithPromise = (paymentRequest: GiftCertificatePaymentRequest) => Promise<RequestPaymentResult>;
/**
 * @docsAlias 상품권(Redirect 방식)
 * @returns 결제 요청이 성공하면 파라미터로 설정한 `successUrl`로 이동해요. 쿼리 파라미터의 `amount` 값이 메서드 파라미터로 설정한 `amount`와 같은지 반드시 확인하고 [결제 승인 API](/reference#결제-승인)를 호출해서 결제를 완료하세요.
 * ```plain theme="grey" copyable="false"
 * {successUrl}?amount={AMOUNT}&orderId={ORDER_ID}&paymentKey={PAYMENT_KEY}
 * ```
 * 결제 요청이 실패하면 파라미터로 설정한 `failUrl`로 이동해요. 쿼리 파라미터로 에러 코드와 메시지를 확인하세요.
 * ```plain theme="grey" copyable="false"
 * {failUrl}?code={ERROR_CODE}&message={ERROR_MESSAGE}&orderId={ORDER_ID}
 * ```
 * Redirect 방식에서는 URL이 이동하기 때문에 `void`가 응답됩니다.
 *
 * @param {RequestGiftCertificatePaymentWithRedirection} paymentRequest 결제 요청 정보입니다.
 *
 * @example
 *  ```javascript
 *  payment.requestPayment({
      method: "CULTURE_GIFT_CERTIFICATE",
      amount: {
        currency: "KRW",
        value: 50000,
      },
      orderId: "<UniqueId name='orderId.giftcertificate' />",
      orderName: "토스 티셔츠 외 2건",
      successUrl: window.location.origin + "/success.html",
      failUrl: window.location.origin + "/fail.html",
      customerEmail: "customer123@gmail.com",
      customerName: "김토스",
    });
 * ```
 */
type RequestGiftCertificatePaymentWithRedirection = (paymentRequest: WithRedirection<GiftCertificatePaymentRequest>) => Promise<void>;
/**
 * @docsAlias 해외 간편결제(Redirect 방식)
 * @returns 결제 요청이 성공하면 파라미터로 설정한 `successUrl`로 이동해요. 쿼리 파라미터의 `amount` 값이 메서드 파라미터로 설정한 `amount`와 같은지 반드시 확인하고 [결제 승인 API](/reference#결제-승인)를 호출해서 결제를 완료하세요.
 * ```plain theme="grey" copyable="false"
 * {successUrl}?amount={AMOUNT}&orderId={ORDER_ID}&paymentKey={PAYMENT_KEY}
 * ```
 * 결제 요청이 실패하면 파라미터로 설정한 `failUrl`로 이동해요. 쿼리 파라미터로 에러 코드와 메시지를 확인하세요.
 * ```plain theme="grey" copyable="false"
 * {failUrl}?code={ERROR_CODE}&message={ERROR_MESSAGE}&orderId={ORDER_ID}
 * ```
 * Redirect 방식에서는 URL이 이동하기 때문에 `void`가 응답됩니다.
 *
 * @param {RequestForeignEasyPayPaymentWithRedirection} paymentRequest 결제 요청 정보입니다.
 *
 * @example
 *  ```javascript
 *  payment.requestPayment({
      method: "FOREIGN_EASY_PAY",
      amount: {
        currency: "USD",
        value: 5000,
      },
      orderId: "<UniqueId name='orderId.paypal' />",
      orderName: "토스 티셔츠 외 2건",
      successUrl: window.location.origin + "/success.html",
      failUrl: window.location.origin + "/fail.html",
      customerEmail: "customer123@gmail.com",
      customerName: "김토스",
      foreignEasyPay: {
        provider: "PAYPAL",
        country: "KR",
      },
    });
 * ```
 */
type RequestForeignEasyPayPaymentWithRedirection = (paymentRequest: WithRedirection<ForeignEasyPayPaymentRequest>) => Promise<void>;

/**
 * 자동결제(빌링) 결제창을 열어 구매자의 카드 등록을 요청하는 메서드입니다.
 *
 * @param {BillingAuthRequest} billingAuthRequest 자동결제(빌링) 등록에 필요한 정보입니다.
 * @returns URL이 이동하기 때문에 `void`가 응답됩니다. 파라미터로 설정한 `successUrl` 또는 `failUrl`에서 카드 등록 결과를 확인하고 [빌링키 발급 API](/reference#authkey로-카드-빌링키-발급)를 호출해야 자동결제를 할 수 있어요.
 *
 * @example
 * ```javascript
 * payment.requestBillingAuth({
 *   method: 'CARD',
 *   successUrl: window.location.origin + '/payment/billing',
 *   failUrl: window.location.origin + '/fail',
 *   customerEmail: 'customer123@gmail.com',
 *   customerName: '김토스',
 * });
 * ```
 *
 * @throws {@link PublicError.Payment.UserCancelError} 사용자가 자동결제 인증창을 닫은 경우
 * @throws {@link PublicError.Payment.PaymentRequestAbortedError} `payment.destroy()` 호출로 자동결제 인증 요청이 중단된 경우
 * @throws {@link PublicError.Payment.NotSupportedMethodError} 가맹점에서 정의되지 않은 method를 넘겨준 경우
 * @throws {@link PublicError.Payment.IncorrectSuccessUrlFormatError} 가맹점에서 유효하지 않은 successUrl을 넘겨준 경우
 * @throws {@link PublicError.Payment.IncorrectFailUrlFormatError} 가맹점에서 유효하지 않은 failUrl을 넘겨준 경우
 * @throws {@link PublicError.Payment.InvalidMethodTransactionError} 이미 다른 명령을 수행 중인 경우
 * @throws {@link PublicError.Payment.InvalidParametersError} 파라미터가 올바르지 않은 경우
 * @throws {@link PublicError.Payment.UnknownError} 알 수 없는 오류가 발생한 경우
 */
type RequestBillingAuth = (billingAuthRequest: BillingAuthRequest) => Promise<void>;

/**
 * amount가 0보다 작거나 같을 때 발생합니다.
 */
declare class BelowZeroAmountError extends PublicInterfaceError {
    constructor();
}

/**
 * failUrl이 올바른 형식이 아닐 때 발생합니다.
 */
declare class IncorrectFailUrlFormatError extends PublicInterfaceError {
    constructor();
}

/**
 * pendingUrl이 올바른 형식이 아닐 때 발생합니다.
 */
declare class IncorrectPendingUrlFormatError extends PublicInterfaceError {
    constructor();
}

/**
 * successUrl이 올바른 형식이 아닐 때 발생합니다.
 */
declare class IncorrectSuccessUrlFormatError extends PublicInterfaceError {
    constructor();
}

/**
 * customer key에 secret key를 사용한 경우 발생합니다.
 */
declare class InsecureKeyUsageError extends PublicInterfaceError {
    constructor();
}

/**
 * 지원하지 않는 통화를 사용하면 발생합니다. 현재는 KRW, USD만 지원합니다.
 */
declare class InvalidAmountCurrencyError extends PublicInterfaceError {
    constructor();
}

/**
 * amount가 숫자가 아닌 경우 발생합니다.
 */
declare class InvalidAmountValueError extends PublicInterfaceError {
    constructor();
}

/**
 * clientKey가 올바르지 않을 때 발생합니다.
 */
declare class InvalidClientKeyError extends PublicInterfaceError {
    constructor();
}

/**
 * customerKey가 올바르지 않을 때 발생합니다.
 */
declare class InvalidCustomerKeyError extends PublicInterfaceError {
    constructor();
}

/**
 * metadata가 올바르지 않을 경우 발생합니다.
 */
declare class InvalidMetadataError extends PublicInterfaceError {
    constructor();
}

/**
 * 이미 다른 명령을 수행하고 있을 때 발생합니다.
 */
declare class InvalidMethodTransactionError extends PublicInterfaceError {
    constructor();
}

/**
 * 입력된 파라미터가 올바르지 않을 경우 발생합니다.
 */
declare class InvalidParametersError extends PublicInterfaceError {
    constructor(message: string);
}

/**
 * `payment.destroy()` 호출 시 진행 중인 결제 요청이 없을 때 발생합니다.
 */
declare class NoActivePaymentRequestError extends PublicInterfaceError {
    constructor();
}

declare class NotSupportedWidgetKeyError extends PublicInterfaceError {
    constructor();
}

/**
 * 요청한 결제수단을 지원하지 않을 때 발생하는 에러입니다
 */
declare class NotSupportedMethodError extends PublicInterfaceError {
    constructor();
}

/**
 * `payment.destroy()` 호출로 진행 중이던 결제 요청이 중단된 경우 발생합니다.
 *
 * 사용자가 직접 결제창을 닫아 발생하는 {@link UserCancelError} 와 의미가 구분됩니다.
 */
declare class PaymentRequestAbortedError extends PublicInterfaceError {
    constructor();
}

/**
 * Promise 방식을 지원하지 않을 때 발생합니다.
 */
declare class NotSupportedPromiseError extends PublicInterfaceError {
    constructor();
}

/**
 * 결제에 실패했을 때 발생하는 에러입니다.
 */
declare class PaymentRequestFailError extends PublicInterfaceError {
    readonly orderId: string;
    constructor(message: string, { orderId, code }: {
        code: string;
        orderId: string;
    });
}

/**
 * 실행 중, 정의되지 않은 에러가 발생했을 때 발생하는 에러입니다.
 */
declare class UnknownError extends PublicInterfaceError {
    constructor();
}

/**
 * 사용자가 제품 창을 닫았을 때 발생하는 에러입니다.
 */
declare class UserCancelError extends PublicInterfaceError {
    constructor();
}

/**
 * v1 메서드는 v2 에서 지원하지 않습니다.
 * 잘못 연동하고 있다는 피드백을 빨리 줄 수 있도록 에러를 명확하게 던집니다.
 */
declare class V1MethodNotSupportedError extends PublicInterfaceError {
    constructor();
}

/**
 * 서버와 통신하는 중 네트워크 오류가 발생했을 때 발생하는 에러입니다.
 */
declare class NetworkError extends PublicInterfaceError {
    constructor();
}

type index$1_BelowZeroAmountError = BelowZeroAmountError;
declare const index$1_BelowZeroAmountError: typeof BelowZeroAmountError;
type index$1_IncorrectFailUrlFormatError = IncorrectFailUrlFormatError;
declare const index$1_IncorrectFailUrlFormatError: typeof IncorrectFailUrlFormatError;
type index$1_IncorrectPendingUrlFormatError = IncorrectPendingUrlFormatError;
declare const index$1_IncorrectPendingUrlFormatError: typeof IncorrectPendingUrlFormatError;
type index$1_IncorrectSuccessUrlFormatError = IncorrectSuccessUrlFormatError;
declare const index$1_IncorrectSuccessUrlFormatError: typeof IncorrectSuccessUrlFormatError;
type index$1_InsecureKeyUsageError = InsecureKeyUsageError;
declare const index$1_InsecureKeyUsageError: typeof InsecureKeyUsageError;
type index$1_InvalidAmountCurrencyError = InvalidAmountCurrencyError;
declare const index$1_InvalidAmountCurrencyError: typeof InvalidAmountCurrencyError;
type index$1_InvalidAmountValueError = InvalidAmountValueError;
declare const index$1_InvalidAmountValueError: typeof InvalidAmountValueError;
type index$1_InvalidClientKeyError = InvalidClientKeyError;
declare const index$1_InvalidClientKeyError: typeof InvalidClientKeyError;
type index$1_InvalidCustomerKeyError = InvalidCustomerKeyError;
declare const index$1_InvalidCustomerKeyError: typeof InvalidCustomerKeyError;
type index$1_InvalidMetadataError = InvalidMetadataError;
declare const index$1_InvalidMetadataError: typeof InvalidMetadataError;
type index$1_InvalidMethodTransactionError = InvalidMethodTransactionError;
declare const index$1_InvalidMethodTransactionError: typeof InvalidMethodTransactionError;
type index$1_InvalidParametersError = InvalidParametersError;
declare const index$1_InvalidParametersError: typeof InvalidParametersError;
type index$1_NetworkError = NetworkError;
declare const index$1_NetworkError: typeof NetworkError;
type index$1_NoActivePaymentRequestError = NoActivePaymentRequestError;
declare const index$1_NoActivePaymentRequestError: typeof NoActivePaymentRequestError;
type index$1_NotSupportedMethodError = NotSupportedMethodError;
declare const index$1_NotSupportedMethodError: typeof NotSupportedMethodError;
type index$1_NotSupportedPromiseError = NotSupportedPromiseError;
declare const index$1_NotSupportedPromiseError: typeof NotSupportedPromiseError;
type index$1_NotSupportedWidgetKeyError = NotSupportedWidgetKeyError;
declare const index$1_NotSupportedWidgetKeyError: typeof NotSupportedWidgetKeyError;
type index$1_PaymentRequestAbortedError = PaymentRequestAbortedError;
declare const index$1_PaymentRequestAbortedError: typeof PaymentRequestAbortedError;
type index$1_PaymentRequestFailError = PaymentRequestFailError;
declare const index$1_PaymentRequestFailError: typeof PaymentRequestFailError;
type index$1_UnknownError = UnknownError;
declare const index$1_UnknownError: typeof UnknownError;
type index$1_UserCancelError = UserCancelError;
declare const index$1_UserCancelError: typeof UserCancelError;
type index$1_V1MethodNotSupportedError = V1MethodNotSupportedError;
declare const index$1_V1MethodNotSupportedError: typeof V1MethodNotSupportedError;
declare namespace index$1 {
  export {
    index$1_BelowZeroAmountError as BelowZeroAmountError,
    index$1_IncorrectFailUrlFormatError as IncorrectFailUrlFormatError,
    index$1_IncorrectPendingUrlFormatError as IncorrectPendingUrlFormatError,
    index$1_IncorrectSuccessUrlFormatError as IncorrectSuccessUrlFormatError,
    index$1_InsecureKeyUsageError as InsecureKeyUsageError,
    index$1_InvalidAmountCurrencyError as InvalidAmountCurrencyError,
    index$1_InvalidAmountValueError as InvalidAmountValueError,
    index$1_InvalidClientKeyError as InvalidClientKeyError,
    index$1_InvalidCustomerKeyError as InvalidCustomerKeyError,
    index$1_InvalidMetadataError as InvalidMetadataError,
    index$1_InvalidMethodTransactionError as InvalidMethodTransactionError,
    index$1_InvalidParametersError as InvalidParametersError,
    index$1_NetworkError as NetworkError,
    index$1_NoActivePaymentRequestError as NoActivePaymentRequestError,
    index$1_NotSupportedMethodError as NotSupportedMethodError,
    index$1_NotSupportedPromiseError as NotSupportedPromiseError,
    index$1_NotSupportedWidgetKeyError as NotSupportedWidgetKeyError,
    index$1_PaymentRequestAbortedError as PaymentRequestAbortedError,
    index$1_PaymentRequestFailError as PaymentRequestFailError,
    index$1_UnknownError as UnknownError,
    index$1_UserCancelError as UserCancelError,
    index$1_V1MethodNotSupportedError as V1MethodNotSupportedError,
  };
}

interface TossPaymentsPayment {
    /**
     * 결제창을 띄웁니다. [자세히 >](#paymentrequestpayment)
     */
    requestPayment: RequestPayment;
    /**
     * 자동결제(빌링) 카드 등록창을 띄웁니다. [자세히 >](#paymentrequestbillingauth)
     */
    requestBillingAuth: RequestBillingAuth;
    /**
     * 현재 열려있는 결제창/인증창을 닫고 launcher 자원을 해제합니다.
     * 열려있는 창이 없을 때 호출해도 안전합니다.
     */
    destroy: Destroy;
}

type index_TossPaymentsPayment = TossPaymentsPayment;
declare namespace index {
  export {
    index$1 as Errors,
    index$2 as Models,
    index_TossPaymentsPayment as TossPaymentsPayment,
  };
}

/**
 * 비회원을 나타내는 상수입니다
 */
declare const ANONYMOUS: "@@ANONYMOUS";
interface TossPaymentsSDK {
    /**
     *
     * 주문서형, 결제창형 결제를 초기화합니다. [자세히 >](/sdk/v2/js/payment-widget#주문서형-결제)
     *
     * @throw {@link PublicError.Widgets.InvalidClientKeyError} clientKey가 올바르지 않은 경우
     * @throw {@link PublicError.Widgets.InvalidCustomerKeyError} customerKey가 올바르지 않은 경우
     * @throw {@link PublicError.Widgets.InsecureKeyUsageError} customerKey에 시크릿키를 사용한 경우
     * @throw {@link PublicError.Widgets.NotSupportedAPIIndividualKeyError} API 개별 연동 키를 clientKey로 사용한 경우
     * @throw {@link PublicError.Widgets.UnknownError} 알 수 없는 오류가 발생한 경우
     * @returns 아래 메서드를 호출할 수 있는 결제 객체를 반환합니다.
     * @example
     * ```javascript
     * // 회원 결제
     * const widgets = tossPayments.widgets({ customerKey });
     *
     * // 비회원 결제
     * // 스크립트 태그 연동방식
     * const widgets = tossPayments.widgets({ customerKey: TossPayments.ANONYMOUS });
     * // 모듈 임포트 연동방식
     * import { ANONYMOUS } from "@tosspayments/tosspayments-sdk";
     * const widgets = tossPayments.widgets({ customerKey: ANONYMOUS });
     * ```
     * @param {WidgetInitParams} params 결제 초기화 정보입니다.
     *
     */
    widgets: (params: WidgetInitParams) => TossPaymentsWidgets;
    /**
     * 브랜드페이를 초기화합니다. [자세히 >](/sdk/v2/js/brandpay#브랜드페이)
     *
     * @throw {@link PublicError.Brandpay.InvalidClientKeyError} clientKey가 올바르지 않은 경우
     * @throw {@link PublicError.Brandpay.InvalidCustomerKeyError} customerKey가 올바르지 않은 경우
     * @throw {@link PublicError.Brandpay.InsecureKeyUsageError} customerKey에 시크릿키를 사용한 경우
     * @throw {@link PublicError.Brandpay.NotSupportedWidgetKeyError} 주문서형, 결제창형 연동 키를 clientKey로 사용한 경우
     * @throw {@link PublicError.Brandpay.UnknownError} 알 수 없는 오류가 발생한 경우
     * @example
     * ```javascript
     * const brandpay = tossPayments.brandpay({
     *   customerKey,
     *   redirectUrl: window.location.origin + '/callback-auth',
     * });
     * ```
     * @returns 아래 메서드를 호출할 수 있는 브랜드페이 객체를 반환합니다.
     * @param {BrandpayInitParams} params 브랜드페이 초기화 정보입니다.
     *
     */
    brandpay: (params: BrandpayInitParams) => TossPaymentsBrandpay;
    /**
     * 결제창(구버전)을 초기화합니다. [자세히 >](/sdk/v2/js/payment#결제창구버전)
     *
     * @throw {@link PublicError.Payment.InvalidClientKeyError} clientKey가 올바르지 않은 경우
     * @throw {@link PublicError.Payment.InvalidCustomerKeyError} customerKey가 올바르지 않은 경우
     * @throw {@link PublicError.Payment.InsecureKeyUsageError} customerKey에 시크릿키를 사용한 경우
     * @throw {@link PublicError.Payment.NotSupportedWidgetKeyError} 주문서형, 결제창형 연동 키를 clientKey로 사용한 경우
     * @throw {@link PublicError.Payment.UnknownError} 알 수 없는 오류가 발생한 경우
     * @example
     * ```javascript
     * const payment = tossPayments.payment({ customerKey });
     * ```
     * @param {PaymentInitParams} params 결제창 초기화 정보입니다.
     * @returns 아래 메서드를 호출할 수 있는 결제창 객체를 반환합니다.
     *
     */
    payment: (params: PaymentInitParams) => TossPaymentsPayment;
}
/**
 * @example
 * ```javascript
 * // 스크립트 태그 연동방식
 * const tossPayments = TossPayments("<WidgetClientKey />"); // 주문서형, 결제창형 연동 키
 * const tossPayments = TossPayments("<ClientKey />");  // API 개별 연동 키
 *
 * // 모듈 임포트 연동방식
 * import { loadTossPayments } from "@tosspayments/tosspayments-sdk"
 * const tossPayments = await loadTossPayments("<WidgetClientKey />");
 * ```
 *
 * @param {string} clientKey 토스페이먼츠가 발급하는 클라이언트 키예요. 개발자센터 [API 키 메뉴](https://developers.tosspayments.com/my/api-keys)에서 확인할 수 있어요. 연동하는 제품에 따라 쓰는 키가 다르고, 맞지 않으면 [에러 코드](/sdk/v2/error-codes)를 받아요.
 *
 * • **주문서형, 결제창형(구 결제위젯)** — [주문서형, 결제창형 연동 키](/reference/using-api/api-keys#주문서형-결제창형-연동-키), `test_gck`, `live_gck`로 시작해요.
 *
 * • **자체창형, 결제창(구버전), 브랜드페이, 자동결제(빌링)** — [API 개별 연동 키](/reference/using-api/api-keys#api-개별-연동-키), `test_ck`, `live_ck`로 시작해요.
 *
 * @returns
 * 아래 메서드를 호출할 수 있는 토스페이먼츠 객체를 반환합니다.
 */
type TossPayments = (clientKey: string) => TossPaymentsSDK;
interface BrandpayInitParams {
    /**
     * 구매자를 식별하는 고유 아이디입니다.
     * 이메일・전화번호나 자동 증가하는 숫자와 같이 유추가 가능한 값은 안전하지 않아요. UUID와 같이 충분히 무작위적인 고유 값으로 생성해주세요.
     * 영문 대소문자, 숫자, 특수문자 `-`, `_`, `=`, `.`, `@` 중 최소 1개를 포함하는 최소 2자 이상 최대 50자 이하의 문자열이어야 합니다.
     */
    customerKey: string;
    /**
     * 브랜드페이 결제 과정에서 [Access Token 발급](/guides/v2/brandpay/auth)을 위해 필요한 URL입니다. Access Token은 브랜드페이 고객을 식별하고 고객의 결제 권한을 증명합니다. 값을 넣지 않으면 개발자센터의 브랜드페이 메뉴에 최초로 등록한 리다이렉트 URL이 기본값으로 들어갑니다.
     *
     * \* 브랜드페이 메뉴에 두 개 이상의 리다이렉트 URL을 등록한 상점은 각 도메인에 맞는 `redirectUrl` 값을 필수로 추가하세요.
     */
    redirectUrl?: string;
    /**
     * @ignore
     */
    features?: {
        cardOCR?: {
            active: boolean;
            autoStart?: boolean;
        };
    };
}
/**
 * @TODO: major version up release시 삭제필요
 * @deprecated BrandpaySDKInitParams를 사용해주세요.
 */
type BrandpaySDKConstructorParams = BrandpayInitParams;
/**
 * @returns 아래 메서드를 호출할 수 있는 토스페이먼츠 객체를 반환합니다.
 */
interface WidgetInitParams {
    /**
     * 구매자를 식별하는 고유 아이디입니다.
     * 이메일・전화번호나 자동 증가하는 숫자와 같이 유추가 가능한 값은 안전하지 않아요. UUID와 같이 충분히 무작위적인 고유 값으로 생성해주세요.
     * 영문 대소문자, 숫자, 특수문자 `-`, `_`, `=`, `.`, `@` 중 최소 1개를 포함하는 최소 2자 이상 최대 50자 이하의 문자열이어야 합니다.
     */
    customerKey: string;
    /**
     * 주문서형, 결제창형으로 브랜드페이를 연동할 때 필요한 정보입니다.
     */
    brandpay?: {
        /**
         * 브랜드페이 결제 과정에서 [Access Token 발급](/guides/v2/brandpay/auth)을 위해 필요한 URL입니다. Access Token은 브랜드페이 고객을 식별하고 고객의 결제 권한을 증명합니다. 값을 넣지 않으면 개발자센터의 브랜드페이 메뉴에 최초로 등록한 리다이렉트 URL이 기본값으로 들어갑니다.
         *
         * \* 브랜드페이 메뉴에 두 개 이상의 리다이렉트 URL을 등록한 상점은 각 도메인에 맞는 `redirectUrl` 값을 필수로 추가하세요.
         */
        redirectUrl?: string;
        /**
         * @ignore
         */
        features?: {
            cardOCR?: {
                active: boolean;
                autoStart?: boolean;
            };
        };
    };
}
/**
 * @TODO: major version up release시 삭제필요
 * @deprecated WidgetSDKInitParams를 사용해주세요.
 */
type WidgetSDKConstructorParams = WidgetInitParams;
interface PaymentInitParams {
    /**
     * 구매자를 식별하는 고유 아이디입니다.
     * 이메일・전화번호나 자동 증가하는 숫자와 같이 유추가 가능한 값은 안전하지 않아요. UUID와 같이 충분히 무작위적인 고유 값으로 생성해주세요.
     * 영문 대소문자, 숫자, 특수문자 `-`, `_`, `=`, `.`, `@` 중 최소 1개를 포함하는 최소 2자 이상 최대 50자 이하의 문자열이어야 합니다.
     */
    customerKey: string;
}
/**
 * @TODO: major version up release시 삭제필요
 * @deprecated PaymentGatewaySDKInitParams를 사용해주세요.
 */
type PaymentGatewaySDKConstructorParams = PaymentInitParams;
declare class IncompatibleSDKVersionError extends PublicInterfaceError {
    constructor();
}
/**
 * v1 결제창과 v2 SDK를 함께 사용하는 페이지에서 `window.TossPayments`를 직접 호출하면 발생합니다.
 * 공존 페이지의 `window.TossPayments`는 로드 순서에 따라 가리키는 버전이 달라지므로,
 * 버전이 고정된 네임스페이스(`window.TossPaymentsV1` / `window.TossPaymentsV2`)로 접근해야 합니다.
 */
declare class NamespaceChangeRequiredError extends PublicInterfaceError {
    constructor();
}

export { ANONYMOUS, index$3 as Brandpay, BrandpayInitParams, BrandpaySDKConstructorParams, IncompatibleSDKVersionError, NamespaceChangeRequiredError, index as Payment, PaymentGatewaySDKConstructorParams, PaymentInitParams, TossPayments, TossPaymentsBrandpay, TossPaymentsPayment, TossPaymentsSDK, TossPaymentsWidgets, WidgetAgreementStatus, WidgetAgreementWidget, WidgetInitParams, WidgetPaymentMethodWidget, WidgetPaymentWindow, WidgetSDKConstructorParams, WidgetSelectedPaymentMethod, index$6 as Widgets };
