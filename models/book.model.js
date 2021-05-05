const mongoose = require('mongoose');
const { Schema } = require('mongoose');


const BookSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  author: String,
  price: Number,
  img: [],
  description: String,
  category: String,
  inStock: Boolean
});

// const Book = mongoose.model('book', BookSchema);
const Book = mongoose.model('product', BookSchema);

module.exports = Book;