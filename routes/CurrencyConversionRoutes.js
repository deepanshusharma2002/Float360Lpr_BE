// routes/api.js
const express = require('express');
const router = express.Router();
const CurrencyConversionController = require('../controllers/CurrencyConversionController.js');
const setAuditFields = require('../middleware/setAuditFields.js');


// API routes
router
    .get('/', CurrencyConversionController.GetCurrencyConversion)
    .post('/', CurrencyConversionController.GetCurrencyConversionRate)

module.exports = router;
