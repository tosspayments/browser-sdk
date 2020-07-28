interface PaymentMessage {
  tossPayments: true;
  from: 'sdk' | 'frame';
  type: unknown;
  data?: unknown;
}
interface PaymentFrameData {
  message: string;
}
export interface PaymentFrameMessage extends PaymentMessage {
  from: 'frame';
  type: 'CANCELED' | 'FAIL' | 'SUCCESS';
  data: PaymentFrameData & any;
}
export interface PaymentSDKMessage extends PaymentMessage {
  from: 'sdk';
  type: 'INIT';
  data: {
    clientKey: string;
    amount: number;
    productName: string;
    userName: string;
    paymentKey: string;
    paymentSecret: string;
  };
}
declare const paymentReqeustMethods: {
  readonly 카드: 'CARD';
  readonly 가상계좌: 'VIRTUAL_ACCOUNT';
  readonly 휴대폰: 'MOBILE_PHONE';
  readonly 상품권: 'GIFT_CERTIFICATE';
};
export interface PaymentRequest {
  method: keyof typeof paymentReqeustMethods;
  amount: number;
  productName: string;
  customerName: string;
  redirectUrl: string;
  callbackForDesktop: (result: PaymentResult) => void;
}
interface BasePaymentResult {
  status: 'SUCCESS' | 'FAILED' | 'CANCELED';
  orderId: string;
  paymentKey: string;
  amount: number;
}
interface SuccessPaymentResult extends BasePaymentResult {
  status: 'SUCCESS';
}
interface FailedPaymentResult extends BasePaymentResult {
  status: 'FAILED';
  reason: string;
}
interface CanceledPaymentResult extends BasePaymentResult {
  status: 'CANCELED';
  reason: string;
}
export declare type PaymentResult =
  | SuccessPaymentResult
  | FailedPaymentResult
  | CanceledPaymentResult;
declare function TossPayments(
  clientKey: string
): {
  requestPayment(
    request: PaymentRequest
  ): Promise<{
    result: 'CANCELED' | 'FAIL' | 'SUCCESS';
    data: PaymentFrameData;
  }>;
};
export default TossPayments;
