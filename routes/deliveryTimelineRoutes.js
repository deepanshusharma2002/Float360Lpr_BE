// routes/api.js
const express = require('express');
const router = express.Router();
const deliveryTimelineController = require('../controllers/deliveryTimelineController');
const setAuditFields = require('../middleware/setAuditFields.js');





// API routes
router
    .get('/', deliveryTimelineController.getDeliveryTimeline)
    .post('/',setAuditFields, deliveryTimelineController.createDeliveryTimeline)
    .put('/', deliveryTimelineController.updateDeliveryTimelineById)
    .delete('/', deliveryTimelineController.deleteDeliveryTimelineById)

module.exports = router;
