const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const cartProductSchema = new Schema({
  book: {
    type: Schema.Types.ObjectId, 
    ref: 'book'
  },
  quantity: {
    type: Number,
    default: 1
  }
})

const cartSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    index: true,
    unique: true
  },
  books: [cartProductSchema]
});

module.exports = { cartSchema };