
const express = require('express');
const router = express.Router();
const uomController = require('../controllers/uomController');
const setAuditFields = require('../middleware/setAuditFields.js');

// API routes
router
    .get('/uoms', uomController.getAllUom)
    .post('/uom', setAuditFields, uomController.createUom)
    .get('/uom/:id', uomController.getUomById)
    .delete('/delete', setAuditFields, uomController.deleteUomById)
    .put('/update', setAuditFields, uomController.updateUomById)
module.exports = router;
