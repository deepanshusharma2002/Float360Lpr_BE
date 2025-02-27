// routes/api.js
const express = require('express');
const router = express.Router();
const quotationController = require('../controllers/quotationController');
const newquotationController = require('../controllers/Quo/QuoController.js');
const upload = require('../utilites/handlefile.js');
const setAuditFields = require('../middleware/setAuditFields.js');

// API routes
router
    .get('/quotes', quotationController.getQuotation)
    .get('/quotes/milestone', quotationController.getQuotationmilestone)
    .get('/approvals', quotationController.GetApprovalsByQuoId)
    .get('/documents', quotationController.GetQuotationDocByQuoId)
    .put('/additional/cost', quotationController.updateAdditionalCost)
    .get('/quotebyrfqid', quotationController.getQuotationbyrfqId)
    .post('/quote', upload.any(), setAuditFields, quotationController.createQuotation)
    .put('/quote', quotationController.updateQuotationById)
    .delete('/quote', quotationController.deleteQuotationById);

// sevice quo
router
    .post('/service', setAuditFields, newquotationController.createServiceQuotation)
    .get('/service', newquotationController.ServiceQuotationList)
    .get('/service/bysrfqid', newquotationController.ServiceQuotationListByServiceRFQid)
    .put('/service/confirm', newquotationController.ServiceQuotationConfirmQuoid)

module.exports = router;
