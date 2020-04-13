import TossPayments from '../../dist/tosspayments.esm';

const tossPayments = TossPayments('test_ck_OEP59LybZ8Bdv6A1JxkV6GYo7pRe');

window.startCommonPayment = async () => {
  const { result } = await tossPayments.requestPayment({
    amount: 1000,
    productName: '토스 티셔츠',
    userName: '토스',
  });

  if (result === 'SUCCESS') {
    alert('결제에 성공했습니다!');
  } else if (result === 'CANCELED') {
    alert('결제를 취소하였습니다.');
  } else if (result === 'FAIL') {
    alert('결제에 실패했습니다.');
  }
};

window.startDirectPayment = async () => {
  const { result } = await tossPayments.requestDirectPayment({
    amount: 1000,
    productName: '토스 티셔츠',
    userName: '토스',
  });

  if (result === 'SUCCESS') {
    alert('결제에 성공했습니다!');
  } else if (result === 'CANCELED') {
    alert('결제를 취소하였습니다.');
  } else if (result === 'FAIL') {
    alert('결제에 실패했습니다.');
  }
};
