// routes/api.js
const express = require('express');
const router = express.Router();
const PaymentTypeChargesController = require('../../controllers/Masters/PaymentTypeChargesController.js');
const setAuditFields = require('../../middleware/setAuditFields.js');

// API routes
router
    .get('/', PaymentTypeChargesController.getPaymentTypeCharges)
    .post('/', setAuditFields, PaymentTypeChargesController.createPaymentTypeCharges)
    .put('/', PaymentTypeChargesController.updatePaymentTypeChargesById)
    .delete('/', PaymentTypeChargesController.deletePaymentTypeChargesById)
    .get('/dropdown', PaymentTypeChargesController.getPaymentTypeChargesDropdown)

module.exports = router;

