const mongoose = require('mongoose');

const dbURI = process.env['dbURI'];

const { bookSchema } = require('../models/book.model.js');
const { cartSchema } = require('../models/cart.model.js');
const { categorySchema } = require('../models/category.model.js');
const { wishlistSchema } = require('../models/wishlist.model.js');

const dbConnect = mongoose.createConnection(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true
});

const Book = dbConnect.model('book', bookSchema);
const Cart = dbConnect.model('cart', cartSchema);
const Wishlist = dbConnect.model('wishlist', wishlistSchema);
const Category = dbConnect.model('category', bookSchema);

module.exports = { dbConnect, Book, Cart, Wishlist, Category };