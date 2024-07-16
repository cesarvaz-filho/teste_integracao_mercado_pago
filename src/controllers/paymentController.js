//const mercadopago = require('../config/mercadoPagoConfig');
const { MercadoPagoConfig, Payment } = require('mercadopago');

const client = new MercadoPagoConfig(
  {
    accessToken: 'TEST-2269202356164791-071521-c821f8ac5ea180be181fe8178095a139-260686843',
    options: { timeout: 5000, idempotencyKey: 'abc' }
  }
);

const payment = new Payment(client);

const createPayment = async (req, res) => {

  const body = {
    transaction_amount: req.body.transaction_amount,
    description: req.body.description,
    payment_method_id: req.body.paymentMethodId,
    payer: {
      email: req.body.email,
      identification: {
        type: req.body.identificationType,
        number: req.body.number
      }
    }
  };

  const requestOptions = {
    idempotencyKey: '<IDEMPOTENCY_KEY>',
  };

  payment.create({ body, requestOptions })
    .then((result) => {
      console.log("result");
      console.log(result);
    })
    .catch((error) => {
      console.log("error");
      console.log(error);
      res.status(500).json({ error: error.message });
    });

  res.send("Tudo OK");

};

module.exports = {
  createPayment
};
