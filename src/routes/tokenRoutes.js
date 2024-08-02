const express = require('express');
const router = express.Router();
const { createCardToken } = require('../controllers/tokenController');

router.post('/create_card_token', createCardToken);

module.exports = router;
