const express = require('express');
const router = express.Router();
const Book = require('../models/book.model');

router.param('bookID', async (req, res, next ,id) => {
  try {
    const book = await Book.findById(id);
    if(!book) {
      return res.status(404).json({success: false, message: "book not found"})
    } 
    req.book = book;
    next()
  } catch (error) {
    res.status(400).json({success: false, message: "could not retrieve book"})
  }
})

router.route('/:bookID')
.get((req, res) => {
  let { book } = req;
  book.__v = undefined;
  res.json({success: true, book })
})

module.exports = router;