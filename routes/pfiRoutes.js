// routes/api.js
const express = require('express');
const router = express.Router();
const pfiController = require('../controllers/pfiController');
const newpfiController = require('../controllers/PfiController/pfiController.js');
const { getPfiLineItemByPoid } = require('../controllers/PfiController/pfiItemController.js');
const setAuditFields = require('../middleware/setAuditFields.js');
const upload = require('../utilites/handlefile.js');

// API routes
router
    .get('/get', pfiController.getPfi)
    .get('/', pfiController.getPfiData)
    .get('/pfibypoid', pfiController.getPfibyPoid)
    .get('/pfibyid', pfiController.getPfibyid)
    .post('/create', setAuditFields, pfiController.genratePfi)
    .post('/addbank', setAuditFields, pfiController.addBank)
    .get('/create2', setAuditFields, pfiController.genratePfi2)
router
    // .post('/create', setAuditFields, newpfiController.create)
    // .get('/list', setAuditFields, newpfiController.pfilist)
    .get('/list', setAuditFields, pfiController.getPfi)
    // .get('/draflist', newpfiController.draftpfilist)
    // .get('/cnfmlist', newpfiController.cnfrmpfilist)
    .post('/sendbybh', newpfiController.PFISendByBH)
    .post('/issuepfi', setAuditFields, upload.any(), newpfiController.issuePFI)
    .post('/approve', newpfiController.approvePfi)
    .post('/reject', newpfiController.rejectPfi)
router.get('/pfiitems', getPfiLineItemByPoid)


module.exports = router; 