// routes/api.js
const express = require('express');
const router = express.Router();
const PaymentTermsController = require('../controllers/paymentTermsController');
const setAuditFields = require('../middleware/setAuditFields')

// API routes

router
    .get('/', PaymentTermsController.getPaymentTerms)
    .post('/', PaymentTermsController.createPaymentTerms)
    .put('/', PaymentTermsController.updatePaymentTermsById)
    .delete('/', PaymentTermsController.deletePaymentTermsById)
router
    .get('/list', PaymentTermsController.getPaymentTerms)
    .get('/dropdown', PaymentTermsController.getPaymentTerms)
    .post('/create', setAuditFields, PaymentTermsController.createPaymentTerms)
    .get('/milesstones', PaymentTermsController.getMileStoneList)
    .put('/update', PaymentTermsController.updatePaymentTermsById)
    .delete('/update', PaymentTermsController.deletePaymentTermsById)
module.exports = router;