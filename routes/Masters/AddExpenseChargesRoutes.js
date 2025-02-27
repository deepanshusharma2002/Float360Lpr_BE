// routes/api.js
const express = require('express');
const router = express.Router();
const AddExpenseChargesController = require('../../controllers/Masters/AddExpenseChargesController');
const setAuditFields = require('../../middleware/setAuditFields.js');

// API routes
router
    .get('/', AddExpenseChargesController.getAddExpenseCharges)
    .post('/', setAuditFields, AddExpenseChargesController.createAddExpenseCharges)
    .put('/', AddExpenseChargesController.updateAddExpenseChargesById)
    .delete('/', AddExpenseChargesController.deleteAddExpenseChargesById)
    .get('/dropdown', AddExpenseChargesController.getAddExpenseChargesDropdown)

module.exports = router;

