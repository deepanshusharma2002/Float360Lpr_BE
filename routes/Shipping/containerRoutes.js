// routes/api.js
const express = require('express');
const router = express.Router();
const containerController = require('../../controllers/ShippingController/containerController.js')
const setAuditFields = require('../../middleware/setAuditFields.js');


// API routes
router
    .get('/containers', containerController.getAllContainers)
    .get('/container_by_ship_id', containerController.getAllContainersByShippingId)
    .post('/addcontainer', setAuditFields, containerController.createContainer)
    .put('/addexpenses', setAuditFields, containerController.addContainerExpense)
    .put('/updatecontainer', setAuditFields, containerController.updateContainer)

module.exports = router;