const express = require('express');
const router = express.Router();

const { Book } = require('../db/db.connect.js');

const { getAllBooks, addNewBook ,getBook } = require('../controllers/book.controller.js');

router.param('bookID', async (req, res, next ,id) => {
  try {
    req.bookID = id;
    next()
  } catch (error) {
    res.status(400).json({success: false, message: "could not retrieve book"})
  }
})


router
.get('/', getAllBooks)
.post('/', addNewBook)
.get('/:bookID', getBook)

module.exports = router;