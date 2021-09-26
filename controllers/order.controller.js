const Razorpay = require('razorpay');
const { User } = require('../db/dbUser.connect.js');
const { Cart, Order } = require('../db/db.connect.js');

const razorpay = new Razorpay({ 
  key_id: process.env['RAZORPAY_KEY_ID'], 
  key_secret: process.env['RAZORPAY_KEY_SECRET'] 
});

const createOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user_id: req.user.userID
    }).populate('books.book');

    const user = await User.findOne({ _id: req.user.userID });
    const name = user.firstName + " " + user.lastName;
    const email = user.email;
    const amount = cart.books.reduce((accumulator, initial) => {
      return accumulator + (initial.book.price * initial.quantity); 
    }, 0);
    
    const order = {
      razorpay_order_id: "",
      razorpay_payment_id: "",
      razorpay_signature: "",
      amount,
      books: cart.books
    }
    
    const user_order = await Order.findOne({ user_id: req.user.userID });

    let receipt;
    
    if (user_order === null) {
      const newOrder = new Order({
        user_id: req.user.userID,
        orders: [order]
      })
      await newOrder.save();
      receipt = newOrder.orders[0]._id.toString();
    } else {
      user_order.orders.push(order);
      await user_order.save();
      receipt = user_order.orders[user_order.orders.length - 1]._id.toString();
    }

    const options = {
      amount: amount.toString().concat('00'),
      currency: "INR",
      receipt: receipt
    }

    const response = await razorpay.orders.create(options);
    
    const filter = {
      user_id: req.user.userID,
      "orders._id": response.receipt
    }
    
    const updatedOrder = await Order.findOneAndUpdate(filter, { "orders.$.razorpay_order_id": response.id }, {new: true})

    res.status(200).json({
      success: true,
      name,
      email,
      order: updatedOrder.orders[updatedOrder.orders.length - 1]
    })

  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    })
  }
}

module.exports = { createOrder };