const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const { cartProductSchema } = require('./cart.model.js');

const orderSchema = new Schema({
  razorpay_order_id: {
    type: String,
    unique: true,
    index: true,
    trim: true,
  },
  razorpay_payment_id: {
    type: String,
    trim: true
  },
  razorpay_signature: {
    type: String,
    trim: true
  },
  status: {
    type: Boolean,
    default: false
  },
  amount: {
    type: Number
  },
  currency: {
    type: String,
    default: "INR"
  },
  books: [cartProductSchema]
}, {timestamps: true});

const userOrderSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    index: true,
    unique: true
  },
  orders: [orderSchema]
}, {timestamps: true})

module.exports = { userOrderSchema };