
const express = require('express');
const router = express.Router();
// const itemController = require('../controllers/itemController');
const { createVendor, deleteVendorById, getAllBankDropDn, getAllVendor, getVendorById } = require('../controllers/vendorController');
const { createVendor2 } = require('../controllers/VendorController/vendorController.js');
const { getVednorListbyitemids } = require('../controllers/itemVendorMapController.js')
const upload = require('../utilites/handlefile.js');
const setAuditFields = require('../middleware/setAuditFields.js');

// API routes
router
    .get('/vendors', getAllVendor)
    .get('/bankdropdn', getAllBankDropDn)
    .post('/vendor', upload.any(), createVendor)
    // .post('/vendor',  createVendor)
    .get('/vendor/:id', getVendorById)
    .delete('/vendor/:id', deleteVendorById)
    .post('/vendorsasitem', getVednorListbyitemids)
router
    .post('/v1/vendor', upload.any(), setAuditFields, createVendor2)
module.exports = router;
