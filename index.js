const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const bookRoutes = require('./routes/book.route.js');
const cartRoutes = require('./routes/cart.route.js');
const authRoutes = require('./routes/auth.route.js');
const wishlistRoutes = require('./routes/wishlist.route.js');
const orderRoutes = require('./routes/order.route.js');
const { checkUser } = require('./middleware/auth.middleware.js');

const app = express();

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Learn Finance API'
  })
})

app.use('/books', bookRoutes);

app.use('/user', authRoutes);

app.use(checkUser);

app.use('/cart', cartRoutes);

app.use('/wishlist', wishlistRoutes);

app.use('/order', orderRoutes);

app.listen(process.env.PORT || 3000, '0.0.0.0');