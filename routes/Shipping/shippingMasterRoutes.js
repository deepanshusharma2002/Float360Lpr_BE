// routes/api.js
const express = require('express');
const router = express.Router();
const shippingController = require('../../controllers/ShippingController/shippingMasterController.js')
const terminalOperationController = require('../../controllers/ShippingController/terminalOperationController.js')
const shippingExpensesController = require('../../controllers/ShippingController/shippingExpensesController.js')
const setAuditFields = require('../../middleware/setAuditFields.js');
const upload = require('../../utilites/handlefile.js');


// API routes
router
    .get('/list', shippingController.getAllShippingMasters)
    .get('/listbyciid', shippingController.getShippingMasterByCiId)
    .put('/create', setAuditFields, shippingController.addshippingEntry)
    // .put('/create', setAuditFields, shippingController.createShippingMaster)
    .put('/addcompliance', setAuditFields, shippingController.addOBLshippingEntry)
    // .put('/addcompliance', setAuditFields, shippingController.addcomplianceinShippingMaster)
    .put('/addeta', setAuditFields, shippingController.addETAinShippingMaster)
    .put('/updateterminal', setAuditFields, shippingController.updateShippingDetailsByCiId)

router
    .get('/terminals', terminalOperationController.getTerminalOperationData)
    .put('/terminal/update', terminalOperationController.updateTerminalDatabyCiID)
router
    .post('/expenses',upload.single('sadFile'), setAuditFields, shippingExpensesController.create)
    .get('/expenses', shippingExpensesController.getShippingById)

module.exports = router;