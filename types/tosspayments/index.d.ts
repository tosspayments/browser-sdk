declare module '@tosspayments/browser-sdk' {
  interface PaymentMessage {
    tossPayments: true;
    from: 'sdk' | 'frame';
    type: unknown;
    data?: unknown;
  }

  export interface PaymentFrameMessage extends PaymentMessage {
    from: 'frame';
    type: 'CANCELED' | 'FAIL' | 'SUCCESS';
    data: {
      message: string;
    };
  }

  export interface PaymentSDKMessage extends PaymentMessage {
    from: 'sdk';
    type: 'INIT';
    data: {
      clientKey: string;
      amount: number;
      productName: string;
      userName: string;
    };
  }

  interface PaymentData {
    amount: number;
    productName: string;
    userName: string;
  }

  function TossPayments(
    clientKey: string
  ): {
    requestPayment(
      data: PaymentData
    ): Promise<{
      result: 'CANCELED' | 'FAIL' | 'SUCCESS';
      data: {
        message: string;
      };
    }>;
    requestDirectPayment(
      data: PaymentData
    ): Promise<{
      result: 'CANCELED' | 'FAIL' | 'SUCCESS';
      data: {
        message: string;
      };
    }>;
  };

  export type TossPaymentsConstuctor = typeof TossPayments;
  export type TossPaymentsInstance = ReturnType<TossPaymentsConstuctor>;

  export default TossPayments;
}
