const express = require('express');
const router = express.Router();

const paymentRequestMasterController = require('../controllers/paymentRequestController');

// Routes
router.post('/', paymentRequestMasterController.createPaymentRequestMaster); // Create a new PaymentRequestMaster
router.get('/list', paymentRequestMasterController.getAllPaymentRequestMasters); // Get all PaymentRequestMasters
router.get('/fortreasury', paymentRequestMasterController.PaymentRequestListForTreasury); // Get all PaymentRequestMasters
router.get('/:id', paymentRequestMasterController.getPaymentRequestMasterById); // Get PaymentRequestMaster by ID
router.put('/:id', paymentRequestMasterController.updatePaymentRequestMaster); // Update PaymentRequestMaster by ID
router.delete('/:id', paymentRequestMasterController.deletePaymentRequestMaster); // Delete PaymentRequestMaster by ID
router.post('/accept/ph', paymentRequestMasterController.AcceptRequestByPH);
module.exports = router;
