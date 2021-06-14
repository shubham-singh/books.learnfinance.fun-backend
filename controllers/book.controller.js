const { Book } = require('../db/db.connect.js');

const getAllBooks =  async (req, res) => {
  try {
    const books = await Book.find({});
    res.json({ 
      success: true, 
      books
    });
  } catch (error) {
    res.json({
      success: false, 
      error: error.message
    });
  }
};

const addNewBook = async (req, res) => {
  try {
    const book = req.body;
    const newBook = new Book(book);
    const savedBook = await newBook.save();
    res.json({success: true, book: savedBook})
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Unable to add product',
      errorMessage: error.message  
    })
  }
}

const getBook = async (req, res) => {
  try {
    let { bookID } = req;
    const book = await Book.findById(id);
    if(!book) {
      throw Error('book not found')
    }
    res.status(200).json({
      success: true,
      book
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    })
  }
}


module.exports = { getAllBooks, addNewBook, getBook }