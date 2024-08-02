const axios = require('axios');
require('dotenv').config();

const createCardToken = async (req, res) => {
  const cardData = {
    card_number: req.body.card_number,
    expiration_month: req.body.expiration_month,
    expiration_year: req.body.expiration_year,
    security_code: req.body.security_code,
    cardholder: {
      name: req.body.cardholder_name,
      identification: {
        type: req.body.cardholder_identification_type,
        number: req.body.cardholder_identification_number
      }
    }
  };

  try {
    const response = await axios.post('https://api.mercadopago.com/v1/card_tokens', cardData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error creating card token:', error.response ? error.response.data : error.message);
    res.status(error.response ? error.response.status : 500).json({ error: error.response ? error.response.data : error.message });
  }
};

module.exports = {
  createCardToken
};
