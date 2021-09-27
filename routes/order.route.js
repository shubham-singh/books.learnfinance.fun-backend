const express = require('express');
const router = express();

const { createOrder, verifyPayment } = require('../controllers/order.controller.js');

router
.post('/', createOrder)
.post('/verify', verifyPayment);
module.exports = router;