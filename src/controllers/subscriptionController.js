//const mercadopago = require('../config/mercadoPagoConfig');
const axios = require('axios');
const { MercadoPagoConfig, PreApproval } = require('mercadopago');
require('dotenv').config();

const client = new MercadoPagoConfig(
  {
    accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
    options: { timeout: 5000, idempotencyKey: 'abc' }
  }
);

const subscription = new PreApproval(client);

const createSubscription = async (req, res) => {

  const body = {
    auto_recurring: {
      frequency: req.body.auto_recurring.frequency,
      frequency_type: req.body.auto_recurring.frequency_type,
      start_date: new Date().toISOString(),
      end_date: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
      transaction_amount: req.body.auto_recurring.transaction_amount,
      currency_id: req.body.auto_recurring.currency_id
    },
    back_url: req.body.back_url,
    card_token_id: req.body.card_token_id,
    external_reference: req.body.external_reference,
    payer_email: req.body.payer_email,
    preapproval_plan_id: req.body.preapproval_plan_id,
    reason: req.body.reason,
    status: req.body.status
  };

  try {
    console.log('Sending subscription request with body:', JSON.stringify(body, null, 2));

    const response = await axios.post('https://api.mercadopago.com/preapproval', body, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`
      }
    });

    console.log('Subscription result:', JSON.stringify(response.data, null, 2));
    res.json(response.data);
  } catch (error) {
    console.error('Error creating subscription:', error.response ? error.response.data : error.message);
    res.status(error.response ? error.response.status : 500).json({ error: error.response ? error.response.data : error.message });
  }
};

module.exports = {
  createSubscription
};
