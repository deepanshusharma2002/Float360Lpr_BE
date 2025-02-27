// routes/api.js
const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/paymentController')
const setAuditFields = require('../middleware/setAuditFields')
const upload = require('../utilites/handlefile.js');




// ========================================================
// PAYMENT  TYPES
// ========================================================
// Get all payment types or a specific payment type by ID
router.get('/type_list', PaymentController.getPaymentTypes);

// Get payment types for dropdowns
router.get('/type_dropdown', PaymentController.getPaymentTypesDropDown);

// Create a new payment type
router.post('/type_create', setAuditFields, PaymentController.createPaymentType);

// Update an existing payment type
router.put('/type_update', setAuditFields, PaymentController.updatePaymentType);

// Soft delete a payment type
router.delete('/type_delete', setAuditFields, PaymentController.deletePaymentType);



// ========================================================
//PENALTY TERM
// ========================================================
// Get all penalty terms or a specific term by ID
router.get('/penalty/term_list', PaymentController.getPenaltyTerms);

// Get penalty terms for dropdowns
router.get('/penalty/term_dropdown', PaymentController.getPenaltyTermsDropDown);

// Create a new penalty term
router.post('/penalty/term_create', setAuditFields, PaymentController.createPenaltyTerm);

// Update an existing penalty term
router.put('/penalty/term_update', setAuditFields, PaymentController.updatePenaltyTerm);

// Soft delete a penalty term
router.delete('/penalty/term_delete', setAuditFields, PaymentController.deletePenaltyTerm);




// ========================================================
// PAYMENT TERM
// ========================================================
// List all payment terms or a specific payment term by ID
router.get('/term_list', PaymentController.getPaymentTerms);

// Get all payment terms for dropdown
router.get('/term_dropdown', PaymentController.getPaymentTermsDropDown);

// Create a new payment term
router.post('/term_create', setAuditFields, PaymentController.createPaymentTerm);

// Update an existing payment term
router.put('/term_update', setAuditFields, PaymentController.updatePaymentTerm);

// Soft delete a payment term
router.delete('/term_delete', setAuditFields, PaymentController.deletePaymentTerm);



// ========================================================
// PAYMENT Request
// ========================================================
// Create a new payment term
router.post('/pr_create', setAuditFields, PaymentController.createPaymentRequestMaster);


// ========================================================
// PAYMENT transaction
// ========================================================
// Create a new payment term
router.post('/transaction', upload.any(), setAuditFields, PaymentController.createPaymentTransactions);



//payment terms
router.get('/terms/dropdown', PaymentController.getAllPaymentTerms);
router.get('/terms/dropdown2', PaymentController.getAllPaymentTerms);




//Payments Approval
// router
// .put('/approval',setAuditFields,sentApprovalRequest, PaymentController.sentforApproval)



module.exports = router;
