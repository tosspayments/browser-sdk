const BASE_URL = 'https://frontend-blitz-demo.dev.toss.bz';

interface PaymentMessage {
  tossPayments: true;
  from: 'sdk' | 'frame';
  type: unknown;
  data?: unknown;
}

export interface PaymentFrameMessage extends PaymentMessage {
  from: 'frame';
  type: 'CANCELED' | 'FAIL' | 'SUCCESS';
  data: any;
}

export function isPaymentFrameMessage(message: any): message is PaymentFrameMessage {
  return message.tossPayments && message.from === 'frame';
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

export function isPaymentSDKMessage(message: any): message is PaymentSDKMessage {
  return message.tossPayments && message.from === 'sdk';
}

interface PaymentData {
  amount: number;
  productName: string;
  userName: string;
}

const frameId = '__@tosspayments/iframe__';

function TossPayments(clientKey: string) {
  function embedPaymentIframe(src: string, data: PaymentData) {
    return new Promise<{ result: PaymentFrameMessage['type']; data: PaymentFrameMessage['data'] }>(
      (resolve) => {
        const iframe = document.createElement('iframe');

        iframe.id = frameId;

        iframe.style.position = 'fixed';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
        iframe.style.top = '0';
        iframe.style.left = '0';
        iframe.style.zIndex = '100';

        iframe.src = src;

        document.body.appendChild(iframe);

        iframe.addEventListener('load', () => {
          iframe.contentWindow?.postMessage(
            {
              tossPayments: true,
              from: 'sdk',
              type: 'INIT',
              data: {
                ...data,
                clientKey,
              },
            },
            '*'
          );
        });

        function handleMessage({ data: message }: MessageEvent) {
          if (isPaymentFrameMessage(message)) {
            iframe.remove();
            const { type, data } = message;
            resolve({ result: type, data });
            window.removeEventListener('message', handleMessage);
          }
        }

        window.addEventListener('message', handleMessage);
      }
    );
  }

  return {
    requestPayment(data: PaymentData) {
      return embedPaymentIframe(`${BASE_URL}/blitz-demo/embed/common`, data);
    },
    requestDirectPayment(data: PaymentData) {
      return embedPaymentIframe(`${BASE_URL}/blitz-demo/embed/direct`, data);
    },
  };
}

export default TossPayments;
