const express = require('express');
const router = express.Router();
const ApprovalLogController = require('../controllers/ApprovalController/approvalLogController'); // Adjust the path
const ApprovalMatrixController = require('../controllers/ApprovalController/approvalMatrixController'); // Adjust the path
const setAuditFields = require('../middleware/setAuditFields.js');


// ApprovalLog Routes
router.post('/logs', setAuditFields,ApprovalLogController.create);
router.get('/logs/:id', ApprovalLogController.findById);
router.get('/logs', ApprovalLogController.findAll);
router.put('/logs/:id',setAuditFields, ApprovalLogController.update);
router.delete('/logs/:id',setAuditFields, ApprovalLogController.delete);

// ApprovalMatrix Routes
router.post('/matrices',setAuditFields, ApprovalMatrixController.create);
router.get('/matrices', ApprovalMatrixController.findAll);
router.get('/matrices/:id', ApprovalMatrixController.findById);
router.put('/matrices/:id',setAuditFields, ApprovalMatrixController.update);
router.delete('/matrices/:id',setAuditFields, ApprovalMatrixController.delete);


module.exports = router;