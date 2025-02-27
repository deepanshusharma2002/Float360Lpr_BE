// routes/api.js
const express = require('express');
const router = express.Router();
const setAuditFields = require('../middleware/setAuditFields.js');


// const itemController = require('../controllers/itemController');
const rfqControllers = require('../controllers/rfqControllers');
const newRfqControllers = require('../controllers/RFQ/RfqController.js');

// API routes
router
    .get('/rfqs', rfqControllers.getAllRfq)
    .get('/vendors', rfqControllers.getVendorsByRfqId)
    .get('/rfq/:id', rfqControllers.getRfqById)
    .delete('/rfq/:id', setAuditFields, rfqControllers.deleteRfqById)
    .post('/rfq', rfqControllers.createRfq)
    .get('/vendor_list', rfqControllers.vendorListbyrfqid)

// sevice rfq
router
    .post('/service', setAuditFields, newRfqControllers.CreateServiceRfq)
    .get('/service', setAuditFields, newRfqControllers.GetRfqList)


module.exports = router;