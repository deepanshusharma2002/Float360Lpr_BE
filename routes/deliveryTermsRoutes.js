// routes/api.js
const express = require('express');
const router = express.Router();
const DeliveryTermsController = require('../controllers/deliveryTermsController');
const setAuditFields = require('../middleware/setAuditFields.js');

// API routes
router
    .get('/', DeliveryTermsController.getDeliveryTerms)
    .post('/', setAuditFields, DeliveryTermsController.createDeliveryTerms)
    .put('/', DeliveryTermsController.updateDeliveryTermsById)
    .delete('/', DeliveryTermsController.deleteDeliveryTermsById)

module.exports = router;
