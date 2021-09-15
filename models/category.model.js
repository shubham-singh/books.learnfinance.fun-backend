const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, "Category name cannot be empty"],
    index: true,
    unique: true
  },
  books: [{ type: Schema.Types.ObjectId, ref: "book" }]
});

module.exports = { categorySchema };