// routes/api.js
const express = require('express');
const router = express.Router();
const ShipmentTypesController = require('../../controllers/Masters/ShipmentTypeController.js');
const setAuditFields = require('../../middleware/setAuditFields.js');

// API routes
router
    .get('/', ShipmentTypesController.getShipmentTypes)
    .post('/', setAuditFields, ShipmentTypesController.createShipmentTypes)
    .put('/', ShipmentTypesController.updateShipmentTypesById)
    .delete('/', ShipmentTypesController.deleteShipmentTypesById)
    .get('/dropdown', ShipmentTypesController.getShipmentTypesDropdown)

module.exports = router;

