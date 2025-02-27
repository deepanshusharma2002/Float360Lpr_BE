// routes/api.js
const express = require('express');
const router = express.Router();
const oprController = require('../controllers/oprController');
const oprItemsController = require('../controllers/oprItemsController');
const setAuditFields = require('../middleware/setAuditFields.js');
const sentApprovalRequest = require('../middleware/approvalMiddleware.js');
const { uploadMulti } = require('../middleware/fileHandler.js');
// const oprItemsController = require('../controllers/oprItemsController');

// API routes 
router
    .get('/oprs', oprController.getOpr)
    .get('/opr/docs', oprController.GetOprDocByOprId)
    .post('/opr', setAuditFields, uploadMulti.any(), oprController.createOpr)
    .put('/opr', setAuditFields, uploadMulti.any(), oprController.updateOprById)
    .delete('/opr', oprController.deleteOprById)
    .post('/confirm/:opr_id', oprController.confirmOpr)
    .get('/additems', oprController.itemforOpr)
    .put('/action', oprController.oprAction)
    .put('/approval',setAuditFields,sentApprovalRequest, oprController.sentforApproval)
router
    .get('/items', oprItemsController.getOprItem)
    .get('/quotecompare', oprItemsController.getOprItemsforQuoteCompare)
    .get('/compdropdown', oprItemsController.getOprCompanyDropdown)
    .get('/itemsforrfq', oprItemsController.getOprItemForRfq)
    .get('/v1/itemsforrfq', oprItemsController.getOprItemForRfq2)
    .get('/itembypo', oprItemsController.getOprListbyPoNumber)
    .get('/companypo', oprItemsController.getcompanylistPoNumber)
    .post('/combitems', oprItemsController.getCombinedItemsByOprItemIds)
    .post('/item', setAuditFields, oprItemsController.createOprItem)
    .put('/item', oprItemsController.updateOprItemById)
    .delete('/draftitem', oprItemsController.deleteOprdraftItem)


module.exports = router;
