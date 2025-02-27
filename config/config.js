// config.js
require('dotenv').config();

module.exports = {
  jwtSecret: process.env.JWT_SECRET,
  salt: process.env.SALT,
};

