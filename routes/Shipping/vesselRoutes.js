const express = require('express');
const router = express.Router();
const vesselController = require('../../controllers/ShippingController/vesselController.js'); // Make sure the path is correct
const setAuditFields = require('../../middleware/setAuditFields.js');

router.post('/create', setAuditFields, vesselController.createVessel);
router.get('/list', vesselController.getAllVessels);
router.get('/listby_shhipping_id', vesselController.getVesselByShipId);

module.exports = router;
