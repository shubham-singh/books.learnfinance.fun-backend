const express = require('express');
const mongoose = require('mongoose');
const dbConnect = require('./db/db.connect.js');
const cors = require('cors');
const bookRoute = require('./routes/book.route');
const Book = require('./models/book.model.js');

const app = express();


// Connecting to databse
dbConnect();

app.use(cors());

app.use(express.json());

app.use('/book', bookRoute);

app.get('/', async (req, res) => {
  try {
    const books = await Book.find({});
    res.json({success: true, products: books});
  } catch(err) {
    res.json({success: false, errorMessage: err.message});
  }
})

app.post('/', async (req, res) => {
  try {
    const book = req.body;
    const NewBook = new Book(book);
    const savedBook = await NewBook.save();
    res.json({success: true, book: savedBook})
  } catch(err) {
    res.status(500).json({
      success: false,
      message: 'Unable to add product',
      errorMessage: err.message  
    })
  }
})


app.listen(process.env.PORT || 3000, '0.0.0.0');