const mongoose = require('mongoose');

const dbURI = process.env['dbURI'];

const { bookSchema } = require('../models/book.model.js');
const { cartSchema } = require('../models/cart.model.js');
const { categorySchema } = require('../models/category.model.js');
const { wishlistSchema } = require('../models/wishlist.model.js');
const { userOrderSchema } = require('../models/order.model.js');

const dbConnect = mongoose.createConnection(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

const Book = dbConnect.model('book', bookSchema);
const Cart = dbConnect.model('cart', cartSchema);
const Wishlist = dbConnect.model('wishlist', wishlistSchema);
const Category = dbConnect.model('category', bookSchema);
const Order = dbConnect.model('order', userOrderSchema);

module.exports = { dbConnect, Book, Cart, Wishlist, Category, Order };