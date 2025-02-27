// routes/api.js
const express = require('express');
const router = express.Router();
const PaymentTermContainerController = require('../../controllers/Masters/PaymentTermContainerMasterController');
const setAuditFields = require('../../middleware/setAuditFields.js');

// API routes
router
    .get('/', PaymentTermContainerController.getPaymentTermContainer)
    .post('/', setAuditFields, PaymentTermContainerController.createPaymentTermContainer)
    .put('/', PaymentTermContainerController.updatePaymentTermContainerById)
    .delete('/', PaymentTermContainerController.deletePaymentTermContainerById)
    .get('/dropdown', PaymentTermContainerController.getPaymentTermContainerDropdown)

module.exports = router;

