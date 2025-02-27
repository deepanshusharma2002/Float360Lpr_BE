const express = require('express');
const router = express.Router();

// Middleware example
const exampleMiddleware = (req, res, next) => {
  console.log('Example Middleware');
  next();
};

/**
 * @route GET /api/v1/example
 * @group Example - Operations about example
 * @returns {object} 200 - A successful response
 * @returns {Error}  default - Unexpected error
 */
router.get('/', exampleMiddleware, (req, res) => {
  res.send('Hello World!');
});

module.exports = router;
