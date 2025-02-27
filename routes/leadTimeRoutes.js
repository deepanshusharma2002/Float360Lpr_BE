// routes/api.js
const express = require('express');
const router = express.Router();
const LeadTimeController = require('../controllers/leadTimeController');
const setAuditFields = require('../middleware/setAuditFields.js');

// API routes
router
    .get('/', LeadTimeController.getLeadTime)
    .post('/', setAuditFields, LeadTimeController.createLeadTime)
    .put('/', LeadTimeController.updateLeadTimeById)
    .delete('/', LeadTimeController.deleteLeadTimeById)

module.exports = router;

