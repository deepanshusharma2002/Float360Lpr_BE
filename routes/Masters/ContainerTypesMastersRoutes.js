// routes/api.js
const express = require('express');
const router = express.Router();
const ContainerTypesController = require('../../controllers/Masters/ContainerTypesMastersController.js');
const setAuditFields = require('../../middleware/setAuditFields.js');

// API routes
router
    .get('/', ContainerTypesController.getContainerTypes)
    .post('/', setAuditFields, ContainerTypesController.createContainerTypes)
    .put('/', ContainerTypesController.updateContainerTypesById)
    .delete('/', ContainerTypesController.deleteContainerTypesById)
    .get('/dropdown', ContainerTypesController.getContainerTypesDropdown)

module.exports = router;

