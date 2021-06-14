const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const wishlistSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    index: true,
    unique: true
  },
  books: [{ type: Schema.Types.ObjectId, ref: "book" }]
});

module.exports = { wishlistSchema };