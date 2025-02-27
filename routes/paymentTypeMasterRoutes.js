const express = require('express');
const router = express.Router();

const paymentTypeMasterController = require('../controllers/paymentTypeMasterController');

// Routes
router.post('/', paymentTypeMasterController.createPaymentTypeMaster); // Create a new PaymentTypeMaster
router.get('/', paymentTypeMasterController.getAllPaymentTypeDropdown); // Get all PaymentTypeMasters
router.get('/get', paymentTypeMasterController.getPaymentTypeMasterById); // Get PaymentTypeMaster by ID
router.put('/', paymentTypeMasterController.updatePaymentTypeMaster); // Update PaymentTypeMaster by ID
router.delete('/', paymentTypeMasterController.deletePaymentTypeMaster); // Delete PaymentTypeMaster by ID

module.exports = router;
