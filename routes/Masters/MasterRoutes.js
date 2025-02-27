// routes/api.js
const express = require('express');
const router = express.Router();
const DocTypeControler = require('../../controllers/Masters/DocTypeMaster.js');
const StatusMasterController = require('../../controllers/statusController');
const setAuditFields = require('../../middleware/setAuditFields.js');

// API routes doc type
router
    .get('/doctype', DocTypeControler.getAllDocTypes)
    .post('/doctype', setAuditFields, DocTypeControler.createDocType)
// .put('/doctype', PaymentTermContainerController.updatePaymentTermContainerById)
// .delete('/doctype', PaymentTermContainerController.deletePaymentTermContainerById)
// .get('/dropdown', PaymentTermContainerController.getPaymentTermContainerDropdown)

module.exports = router;

//API master routes

// API routes
router
    .get('/status', StatusMasterController.getAllStatus)
    .post('/status', StatusMasterController.createStatus)
    .put('/status', StatusMasterController.updateStatus)
    .delete('/status', StatusMasterController.deleteStatus)

module.exports = router;
