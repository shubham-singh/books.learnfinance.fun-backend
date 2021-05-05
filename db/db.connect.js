const mongoose = require('mongoose');

const username = process.env['username'];
const password = process.env['password'];

// const dbURI = `mongodb+srv://${username}:${password}@neog-cluster.wiph4.mongodb.net/books`;
const dbURI = `mongodb+srv://${username}:${password}@neog-cluster.wiph4.mongodb.net/inventory`;

const dbConnect = async () => {
  try {
    const connection = await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Successfully connected to database");
  } catch (error) {
    console.error("Database connection failed")
  }
}

module.exports = dbConnect;