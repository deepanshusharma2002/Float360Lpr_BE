// routes/api.js
const express = require('express');
const router = express.Router();
const PaymentTypeTransportController = require('../../controllers/Masters/PaymentTypeTransportController.js');
const setAuditFields = require('../../middleware/setAuditFields.js');

// API routes
router
    .get('/', PaymentTypeTransportController.getPaymentTypeTransport)
    .post('/', setAuditFields, PaymentTypeTransportController.createPaymentTypeTransport)
    .put('/', PaymentTypeTransportController.updatePaymentTypeTransportById)
    .delete('/', PaymentTypeTransportController.deletePaymentTypeTransportById)
    .get('/dropdown', PaymentTypeTransportController.getPaymentTypeTransportDropdown)

module.exports = router;

