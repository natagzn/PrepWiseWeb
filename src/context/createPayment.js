import CryptoJS from 'crypto-js';

const createPayment = async (amount) => {
  const merchantAccount = 'test_merch_n1'; // ваш тестовий акаунт
  const merchantSecretKey = 'flk3409refn54t54t*FNJRET'; // ваш тестовий секретний ключ
  const orderReference = `TEST_ORDER_${Date.now()}`;
  const merchantDomainName = 'localhost';

  const data = {
    merchantAccount,
    merchantDomainName,
    merchantTransactionSecureType: 'AUTO',
    merchantSignature: 'merchantSignature',
    language: localStorage.language.toUpperCase(),
    orderReference,
    orderDate: Math.floor(Date.now() / 1000),
    amount: amount,
    currency: 'UAH',
    productName: ['Підписка преміум'],
    productCount: [1],
    productPrice: [amount],
  };

  // Генерація підпису
  const signatureString = `${merchantAccount};${merchantDomainName};${orderReference};${data.orderDate};${amount};UAH;${data.productName[0]};1;${amount}`;
  data.merchantSignature = CryptoJS.HmacSHA1(
    signatureString,
    merchantSecretKey
  ).toString();

  // Перенаправлення на WayForPay
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = 'https://secure.wayforpay.com/pay';

  Object.keys(data).forEach((key) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = key;
    input.value = data[key];
    form.appendChild(input);
  });

  document.body.appendChild(form);
  console.log(data);
  console.log(signatureString);
  form.submit();
};

export default createPayment;
