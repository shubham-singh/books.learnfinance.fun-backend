const express = require('express');
const router = express.Router();

const { getCart, addToCart, changeQuantity } = require('../controllers/cart.controller.js');

router
.get('/', getCart)
.post('/add', addToCart)
.post('/change', changeQuantity)

module.exports = router;