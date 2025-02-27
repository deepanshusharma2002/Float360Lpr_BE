// routes/api.js
const express = require('express');
const router = express.Router();
const ShippingAdviseContainerTypesController = require('../../controllers/Masters/ShippingAdviseContainerTypesController.js');
const setAuditFields = require('../../middleware/setAuditFields.js');

// API routes
router
    .get('/', ShippingAdviseContainerTypesController.getContainerTypes)
    .post('/', setAuditFields, ShippingAdviseContainerTypesController.createContainerTypes)
    .put('/', ShippingAdviseContainerTypesController.updateContainerTypesById)
    .delete('/', ShippingAdviseContainerTypesController.deleteContainerTypesById)
    .get('/dropdown', ShippingAdviseContainerTypesController.getContainerTypesDropdown)

module.exports = router;

