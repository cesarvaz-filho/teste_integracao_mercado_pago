const mercadopago = require('mercadopago');
const dotenv = require('dotenv');

dotenv.config();

const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;

if (!accessToken) {
  console.error('MERCADO_PAGO_ACCESS_TOKEN is not defined in .env file');
  process.exit(1);
}

console.log(`Using MercadoPago Access Token: ${accessToken}`);

mercadopago.configure({
  access_token: accessToken
});

module.exports = mercadopago;