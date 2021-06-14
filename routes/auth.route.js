const express = require('express');
const router = express.Router();

const { signup, login } = require('../controllers/auth.controller.js');

route
.post('/signup', signup)
.post('/login', login)

module.exports = router;