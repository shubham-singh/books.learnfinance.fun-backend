const { Wishlist } = require('../db/db.connect.js');

const getWishlist = async (req, res) => {
  try {

    const wishlist = await Wishlist.findOne({
      user_id: req.user.userID
    });

    if(wishlist === null) {
      return res.status(200).json({
        success: true,
        wishlist: {
          books: []
        }
      })
    }

    res.status(200).json({
      success: true,
      wishlist
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      error: error.message
    });
  
  }
}

const addToWishlist = async (req, res) => {
  try {

    const wishlist = await Wishlist.findOne({
      user_id: req.user.userID
    });

    const { book } = req.body;

    if(wishlist === null) {
      const newWishlist = new Wishlist({
        user_id: req.user.userID,
        books: [book]
      });

      await newWishlist.save();

      return res.status(200).json({
        success: true,
        wishlist: newWishlist
      })
    }

    wishlist.books.push(book);

    await wishlist.save();

    res.status(200).json({
      success: true,
      wishlist
    })

  } catch (error) {

    res.status(200).json({
      success: false,
      error: error.message
    })

  }
}

const removeFromWishlist = async (req, res) => {
  try {

    const wishlist = await Wishlist.findOne({
      user_id: req.user.userID
    });

    const { book } = req.body

    wishlist.books.pull(book);

    await wishlist.save();

    res.status(200).json({
      success: true,
      wishlist
    })

  } catch (error) {

    res.status(400).json({
      success: true,
      error: error.message
    })

  }

}

const addOrRemoveFromWishlist = async (req, res) => {
  try {

    const wishlist = await Wishlist.findOne({
      user_id: req.user.userID
    });

    const { book } = req.body;

    if(wishlist === null) {

      const newWishlist = new Wishlist({
        user_id: req.user.userID,
        books: [book]
      });

      return res.status(200).json({
        success: true,
        wishlist: newWishlist
      })

    }

    if(wishlist.books.includes(book)) {
      await wishlist.books.pull(book);
    } else {
      await wishlist.books.push(book);
    }

    await wishlist.save();

    res.status(200).json({
      success: true,
      wishlist
    })

  } catch (error) {

    res.status(400).json({
      success: false,
      error: error.message
    })

  }
}

module.exports = { getWishlist, addToWishlist, removeFromWishlist, addOrRemoveFromWishlist }