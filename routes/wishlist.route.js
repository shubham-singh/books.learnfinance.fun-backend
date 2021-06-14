const express = require('express');

const router = express.Router();

const { getWishlist, addOrRemoveFromWishlist ,addToWishlist, removeFromWishlist } = require('../controllers/wishlist.controller.js');

router
.get('/', getWishlist)
.post('/', addOrRemoveFromWishlist)
.post('/add', addToWishlist)
.post('/remove', removeFromWishlist)


module.exports = router;