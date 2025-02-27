// routes/api.js
const express = require('express');
const router = express.Router();
const InitiationPointMasterController = require('../../controllers/Masters/InitiationPointMasterController.js');
const setAuditFields = require('../../middleware/setAuditFields.js');

// API routes
router
    .get('/', InitiationPointMasterController.getInitiationPoint)
    .post('/', setAuditFields, InitiationPointMasterController.createInitiationPoint)
    .put('/', InitiationPointMasterController.updateInitiationPointById)
    .delete('/', InitiationPointMasterController.deleteInitiationPointById)
    .get('/dropdown', InitiationPointMasterController.getInitiationPointDropdown)

module.exports = router;

