const { Cart } = require('../db/db.connect.js');

const getCart = async (req, res) => {
  try {

    const cart = await Cart.findOne({
      user_id: req.user.userID
    }).populate('books.book');
    
    if(cart === null) {
      return res.status(200).json({
        success: true,
        cart: {
          books: []
        }
      })
    }

    res.status(200).json({
      success: true,
      cart
    })

  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    })
  }
};

const addToCart = async (req, res) => {
  try {

    const cart = await Cart.findOne({
      user_id: req.user.userID
    });

    const { book } = req.body;
    
    if(cart === null) {
      const newCart = new Cart({
        user_id: req.user.userID,
        books: [{book}]
      })
      
      await newCart.save();

      return res.status(200).json({
        success: true,
        cart: newCart
      }); 
    }

    cart.books.push({book});

    await cart.save();
    
    res.status(200).json({
      success: true,
      cart
    })

  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    })
  }
};

const changeQuantity = async (req, res) => {
  try {

    const { book, quantity } = req.body;
    
    if(quantity === 0) {

      const filter = {
        user_id: req.user.userID
      }
      const update = {
        '$pull': {
          'books': { 'book': book }
        }
      }

      const cart = await Cart.findOneAndUpdate(filter, update, { new: true });

      return res.status(200).json({
        success: true,
        cart
      });
    }

    const filter = {
      user_id: req.user.userID,
      'books.book': book
    };

    const update = {
      '$set': { 'books.$.quantity': quantity }
    }

    const cart = await Cart.findOneAndUpdate(filter, update, { new: true })

    console.log(cart);

    res.status(200).json({
      success: true,
      cart
    })

  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    })
  } 
}

module.exports = { getCart, addToCart, changeQuantity }