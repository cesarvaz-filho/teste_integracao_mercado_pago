const express = require('express');
const router = express.Router();
const { createSubscription } = require('../controllers/subscriptionController');

router.post('/create_subscription', createSubscription);

module.exports = router;
