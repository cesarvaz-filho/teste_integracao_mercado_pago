const express = require('express');
const app = express();
const paymentRoutes = require('./routes/paymentRoutes');

app.use(express.json());
app.use('/api', paymentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
