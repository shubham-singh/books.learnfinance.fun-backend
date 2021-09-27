const jwt = require('jsonwebtoken');
const { User } = require('../db/dbUser.connect.js');
const secret = process.env['secret'];

const checkUser = async (req, res, next) => {
  
  const token = req.headers.authorization;
  try {
    if(token) {
      const decoded = jwt.verify(token, secret);
      const user = await User.findById(decoded.userID);
      req.user = { userID: user._id };
      return next();
    } else {
      throw Error('token not found')
    } 
  } catch (error) {
      res.status(401).json({
        success: false,
        error: error.message
      })
  }
}

module.exports = { checkUser }