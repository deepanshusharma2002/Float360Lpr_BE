const express = require("express");
const router = express.Router();

const servicePOQuotationController = require('../../controllers/ServicePOController/RateCardController.js');
const setAuditFields = require("../../middleware/setAuditFields.js");
const { uploadMulti } = require("../../middleware/fileHandler.js");


router
    .post('/ratecard', servicePOQuotationController.createRateCardMaster)
    router.get('/ratecard', servicePOQuotationController.getRateCardMaster);



    module.exports = router;