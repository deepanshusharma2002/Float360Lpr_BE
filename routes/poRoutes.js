// routes/api.js
const express = require('express');
const router = express.Router();
const POController = require('../controllers/poController');
const { generatePo } = require('../controllers/quotationController');
const upload = require('../utilites/handlefile.js');
const setAuditFields = require('../middleware/setAuditFields.js');

// API routes
router
    .get('/list', POController.getPO)
    // .post('/create', setAuditFields, POController.generatePo)
    .post('/create', POController.generatePo)
    .put('/update', POController.updatePOById)
    .delete('/delete', POController.deletePOById)
    .post('/accept',  upload.any(), POController.AcceptPO)
    .post('/completecnfrm', upload.any(), setAuditFields, POController.completePo)
    .post('/paymentconfirm', POController.confimPoPaymentsbyVendor)
    .post('/finalpaymentconfirm', POController.confimPoFinalPaymentsbyVendor)
    .get('/vendor', POController.getVendorDeailsByPoId)
router
    .get('/itemlist', POController.getPoItemsbypoid)
    .get('/bank/charge', POController.getBankChargebypoid)

// list for grny
router
    .get('/forgrn', POController.getPOforGrn)

module.exports = router;