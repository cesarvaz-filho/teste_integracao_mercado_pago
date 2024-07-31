//const mercadopago = require('../config/mercadoPagoConfig');
const { MercadoPagoConfig, Payment } = require('mercadopago');
require('dotenv').config();

const client = new MercadoPagoConfig(
  {
    accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
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
    idempotencyKey: 'abc',
    headers: {
      'Authorization': `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`
    }
  };

  try {
    console.log('Sending payment request with body:', JSON.stringify(body, null, 2));
    const result = await payment.create({ body, requestOptions });
    console.log('Payment result:', JSON.stringify(result, null, 2));
    res.json(result.body);
  } catch (error) {
    console.error('Error creating payment:', error);

    if (error.response) {
      console.error('Error response data:', error.response.data);
      res.status(error.response.status).json({ error: error.response.data });
    } else {
      res.status(500).json({ error: error.message });
    }
  }

};

module.exports = {
  createPayment
};
