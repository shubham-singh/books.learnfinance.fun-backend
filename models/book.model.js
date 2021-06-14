const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const bookSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  author: String,
  price: Number,
  img: {
    "default": {
      type: String,
    }
  },
  description: String,
  category: String,
  inStock: Boolean
});

module.exports = { bookSchema };